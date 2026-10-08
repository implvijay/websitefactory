import { useState } from 'react';
import type { Page, Theme, ThemeVariant, Section } from '../types';
import { DndContext, DragEndEvent, useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

interface PageBuilderProps {
  page: Page;
  theme: Theme | ThemeVariant;
  onUpdate: (page: Page) => void;
}

const sectionTypes = [
  { type: 'hero', label: 'Hero Section', icon: '🎯' },
  { type: 'features', label: 'Features', icon: '⭐' },
  { type: 'services', label: 'Services', icon: '🔧' },
  { type: 'testimonials', label: 'Testimonials', icon: '💬' },
  { type: 'cta', label: 'Call to Action', icon: '📢' },
  { type: 'text', label: 'Text Block', icon: '📝' },
  { type: 'image', label: 'Image', icon: '🖼️' },
  { type: 'contact', label: 'Contact Form', icon: '📧' },
];

function DraggableSection({ section }: { section: any }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: section.type,
  });
  const style = transform ? {
    transform: CSS.Translate.toString(transform),
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="p-3 bg-white border-2 border-gray-200 rounded-lg cursor-move hover:border-indigo-500 transition-colors"
    >
      <div className="flex items-center gap-2">
        <span className="text-2xl">{section.icon}</span>
        <span className="font-medium text-sm">{section.label}</span>
      </div>
    </div>
  );
}

function DroppableArea({ page, theme, onUpdate }: PageBuilderProps) {
  const { setNodeRef } = useDroppable({
    id: 'page-content',
  });

  const addSection = (type: string) => {
    const newSection: Section = {
      id: Date.now().toString(),
      type,
      content: getDefaultContent(type),
      animation: { type: 'none', duration: 0, delay: 0 },
    };
    onUpdate({ ...page, sections: [...page.sections, newSection] });
  };

  const removeSection = (sectionId: string) => {
    onUpdate({ ...page, sections: page.sections.filter(s => s.id !== sectionId) });
  };

  const updateSection = (sectionId: string, updates: Partial<Section>) => {
    onUpdate({
      ...page,
      sections: page.sections.map(s => s.id === sectionId ? { ...s, ...updates } : s),
    });
  };

  return (
    <div ref={setNodeRef} className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4" style={{ color: theme.colors.text }}>
          {page.title}
        </h2>

        {page.sections.length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
            <p className="text-gray-500 mb-4">Drag sections here or click to add</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {sectionTypes.map(section => (
                <button
                  key={section.type}
                  onClick={() => addSection(section.type)}
                  className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-indigo-500 transition-colors"
                >
                  <div className="text-3xl mb-2">{section.icon}</div>
                  <div className="text-sm font-medium">{section.label}</div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {page.sections.map((section, index) => (
              <div
                key={section.id}
                className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-indigo-500 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">
                      {sectionTypes.find(s => s.type === section.type)?.icon}
                    </span>
                    <h3 className="text-lg font-semibold">
                      {sectionTypes.find(s => s.type === section.type)?.label}
                    </h3>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const newSections = [...page.sections];
                        const [moved] = newSections.splice(index, 1);
                        newSections.splice(index - 1, 0, moved);
                        onUpdate({ ...page, sections: newSections });
                      }}
                      disabled={index === 0}
                      className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => {
                        const newSections = [...page.sections];
                        const [moved] = newSections.splice(index, 1);
                        newSections.splice(index + 1, 0, moved);
                        onUpdate({ ...page, sections: newSections });
                      }}
                      disabled={index === page.sections.length - 1}
                      className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => removeSection(section.id)}
                      className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Section Content Editor */}
                <div className="space-y-4">
                  {Object.entries(section.content).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                        {key}
                      </label>
                      {typeof value === 'string' && value.length > 100 ? (
                        <textarea
                          value={value}
                          onChange={(e) => updateSection(section.id, {
                            content: { ...section.content, [key]: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                          rows={4}
                        />
                      ) : typeof value === 'string' ? (
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => updateSection(section.id, {
                            content: { ...section.content, [key]: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                      ) : (
                        <textarea
                          value={JSON.stringify(value, null, 2)}
                          onChange={(e) => {
                            try {
                              const parsed = JSON.parse(e.target.value);
                              updateSection(section.id, {
                                content: { ...section.content, [key]: parsed }
                              });
                            } catch {}
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
                          rows={6}
                        />
                      )}
                    </div>
                  ))}

                  {/* Animation Settings */}
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-medium text-sm mb-2">Animation</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Type</label>
                        <select
                          value={section.animation?.type || 'none'}
                          onChange={(e) => updateSection(section.id, {
                            animation: {
                              ...section.animation,
                              type: e.target.value as any,
                              duration: section.animation?.duration || 0.5,
                              delay: section.animation?.delay || 0,
                            }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        >
                          <option value="none">None</option>
                          <option value="fadeIn">Fade In</option>
                          <option value="slideUp">Slide Up</option>
                          <option value="slideLeft">Slide Left</option>
                          <option value="scale">Scale</option>
                          <option value="bounce">Bounce</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Duration (s)</label>
                        <input
                          type="number"
                          value={section.animation?.duration || 0.5}
                          onChange={(e) => updateSection(section.id, {
                            animation: {
                              type: section.animation?.type || 'none',
                              duration: parseFloat(e.target.value),
                              delay: section.animation?.delay || 0,
                            }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          step="0.1"
                          min="0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Add More Sections */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <p className="text-center text-gray-500 mb-4">Add more sections</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {sectionTypes.map(section => (
                  <button
                    key={section.type}
                    onClick={() => addSection(section.type)}
                    className="p-3 bg-white border-2 border-gray-200 rounded-lg hover:border-indigo-500 transition-colors"
                  >
                    <div className="text-2xl mb-1">{section.icon}</div>
                    <div className="text-xs font-medium">{section.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function getDefaultContent(type: string): Record<string, any> {
  const defaults: Record<string, Record<string, any>> = {
    hero: {
      heading: 'Welcome to Our Website',
      description: 'We provide excellent services for your business needs.',
      buttonText: 'Get Started',
      buttonUrl: '#contact',
    },
    features: {
      title: 'Our Features',
      features: [
        { icon: '⚡', title: 'Fast', description: 'Lightning fast performance' },
        { icon: '🔒', title: 'Secure', description: 'Enterprise-grade security' },
        { icon: '📱', title: 'Responsive', description: 'Works on all devices' },
      ],
    },
    services: {
      title: 'Our Services',
      services: [
        { icon: '🔧', title: 'Service One', description: 'Description of service one' },
        { icon: '📋', title: 'Service Two', description: 'Description of service two' },
        { icon: '🎯', title: 'Service Three', description: 'Description of service three' },
      ],
    },
    testimonials: {
      title: 'What Our Clients Say',
      testimonials: [
        { name: 'John Doe', role: 'CEO, Company', text: 'Excellent service!', rating: 5 },
        { name: 'Jane Smith', role: 'Director, Corp', text: 'Highly recommended!', rating: 5 },
      ],
    },
    cta: {
      heading: 'Ready to Get Started?',
      description: 'Contact us today to learn more.',
      buttonText: 'Contact Us',
      buttonUrl: '#contact',
    },
    text: {
      content: 'Your text content goes here. Edit this to add your own text.',
    },
    image: {
      src: 'https://via.placeholder.com/800x400',
      alt: 'Image description',
      caption: 'Image caption',
    },
    contact: {
      title: 'Contact Us',
      description: 'Get in touch with us today.',
      email: 'info@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, City, State',
    },
  };
  return defaults[type] || {};
}

export function PageBuilder(props: PageBuilderProps) {
  return (
    <DndContext onDragEnd={() => {}}>
      <DroppableArea {...props} />
    </DndContext>
  );
}
