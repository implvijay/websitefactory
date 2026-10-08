// Form Service - Form builder and validation
import type { Form, FormField, Project } from '../../types';
import { getProject, saveProject } from '../../storage/BrowserStorage';

export class FormService {
  async getProjectForms(projectId: string): Promise<Form[]> {
    const project = getProject(projectId);
    return project?.forms || [];
  }

  async getForm(projectId: string, formId: string): Promise<Form | null> {
    const project = getProject(projectId);
    return project?.forms.find(f => f.id === formId) || null;
  }

  async createForm(projectId: string, name: string): Promise<Form> {
    const project = getProject(projectId);
    if (!project) throw new Error('Project not found');

    const newForm: Form = {
      id: Date.now().toString(),
      name,
      fields: [],
      submitAction: 'email',
      submitConfig: { email: project.settings.contactEmail },
      successMessage: 'Thank you for your submission!',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedProject: Project = {
      ...project,
      forms: [...project.forms, newForm],
      updatedAt: new Date().toISOString(),
    };

    saveProject(updatedProject);
    return newForm;
  }

  async updateForm(projectId: string, formId: string, updates: Partial<Form>): Promise<Form> {
    const project = getProject(projectId);
    if (!project) throw new Error('Project not found');

    const formIndex = project.forms.findIndex(f => f.id === formId);
    if (formIndex === -1) throw new Error('Form not found');

    const updatedForm: Form = {
      ...project.forms[formIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    const updatedForms = [...project.forms];
    updatedForms[formIndex] = updatedForm;

    const updatedProject: Project = {
      ...project,
      forms: updatedForms,
      updatedAt: new Date().toISOString(),
    };

    saveProject(updatedProject);
    return updatedForm;
  }

  async deleteForm(projectId: string, formId: string): Promise<void> {
    const project = getProject(projectId);
    if (!project) throw new Error('Project not found');

    const updatedForms = project.forms.filter(f => f.id !== formId);
    const updatedProject: Project = {
      ...project,
      forms: updatedForms,
      updatedAt: new Date().toISOString(),
    };

    saveProject(updatedProject);
  }

  async addField(projectId: string, formId: string, field: Omit<FormField, 'id' | 'order'>): Promise<Form> {
    const form = await this.getForm(projectId, formId);
    if (!form) throw new Error('Form not found');

    const newField: FormField = {
      ...field,
      id: Date.now().toString(),
      order: form.fields.length,
    };

    return this.updateForm(projectId, formId, {
      fields: [...form.fields, newField],
    });
  }

  async updateField(projectId: string, formId: string, fieldId: string, updates: Partial<FormField>): Promise<Form> {
    const form = await this.getForm(projectId, formId);
    if (!form) throw new Error('Form not found');

    const updatedFields = form.fields.map(f =>
      f.id === fieldId ? { ...f, ...updates } : f
    );

    return this.updateForm(projectId, formId, { fields: updatedFields });
  }

  async deleteField(projectId: string, formId: string, fieldId: string): Promise<Form> {
    const form = await this.getForm(projectId, formId);
    if (!form) throw new Error('Form not found');

    const updatedFields = form.fields.filter(f => f.id !== fieldId);
    return this.updateForm(projectId, formId, { fields: updatedFields });
  }

  async reorderFields(projectId: string, formId: string, fieldIds: string[]): Promise<Form> {
    const form = await this.getForm(projectId, formId);
    if (!form) throw new Error('Form not found');

    const reorderedFields = fieldIds
      .map((id, index) => {
        const field = form.fields.find(f => f.id === id);
        return field ? { ...field, order: index } : null;
      })
      .filter((f): f is FormField => f !== null);

    return this.updateForm(projectId, formId, { fields: reorderedFields });
  }

  validateSubmission(form: Form, data: Record<string, any>): { valid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};

    for (const field of form.fields) {
      const value = data[field.id];

      if (field.required && (!value || value === '')) {
        errors[field.id] = `${field.label} is required`;
        continue;
      }

      if (value && field.validation) {
        if (field.type === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            errors[field.id] = 'Invalid email address';
          }
        }

        if (field.validation.minLength && value.length < field.validation.minLength) {
          errors[field.id] = field.validation.message || `Minimum length is ${field.validation.minLength}`;
        }

        if (field.validation.maxLength && value.length > field.validation.maxLength) {
          errors[field.id] = field.validation.message || `Maximum length is ${field.validation.maxLength}`;
        }

        if (field.validation.pattern) {
          const regex = new RegExp(field.validation.pattern);
          if (!regex.test(value)) {
            errors[field.id] = field.validation.message || 'Invalid format';
          }
        }
      }
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors,
    };
  }
}

export const formService = new FormService();
