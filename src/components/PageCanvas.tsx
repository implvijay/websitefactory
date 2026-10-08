// Page canvas with drag-and-drop section builder
import { useState } from 'react';
import { DndContext, DragEndEvent, useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { Page, Section, Theme, ThemeVariant } from '../types';
import { SectionRenderer } from './SectionRenderer';
import { componentDefinitions } from '../data/components';

interface PageCanvasProps {
  page: Page;
  theme: Theme | ThemeVariant;
  onUpdate: (page: Page) => void;
}

function DraggableComponent({ component }: { component: any }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `component-${component.id}`,
    data: { type: component.id },
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
      className="p-3 bg-white border-2 border-gray-200 rounded-lg cursor-move hover:border-indigo-500 hover:shadow-md transition-all"
    >
      <div className="flex items-center gap-2">
        <span className="text-2xl">{component.icon}</span>
        <div>
          <div className="font-medium text-sm">{component.name}</div>
          <div className="text-xs text-gray-500">{component.category}</div>
        </div>
      </div>
    </div>
  );
}

export function PageCanvas({ page, theme, onUpdate }: PageCanvasProps) {
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    // Check if dropping on canvas
    if (over.id === 'page-canvas') {
      const componentType = active.data.current?.type;
      if (componentType) {
        const componentDef = componentDefinitions.find(c => c.id === componentType);
        if (componentDef) {
          const newSection: Section = {
            id: Date.now().toString(),
            type: componentType,
            variant: componentDef.variants[0] || 'default',
            content: { ...componentDef.defaultContent },
            settings: {},
            animation: { type: 'none', duration: 0, delay: 0 },
            order: page.sections.length,
            visible: true,
          };
          onUpdate({
            ...page,
            sections: [...page.sections, newSection],
          });
        }
      }
    }
  };

  const removeSection = (sectionId: string) => {
    onUpdate({
      ...page,
      sections: page.sections.filter(s => s.id !== sectionId),
    });
    if (selectedSectionId === sectionId) {
      setSelectedSectionId(null);
    }
  };

  const moveSection = (index: number, direction: number) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= page.sections.length) return;
    
    const newSections = [...page.sections];
    [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
    // Update order
    newSections.forEach((s, i) => s.order = i);
    onUpdate({ ...page, sections: newSections });
  };

  const updateSection = (sectionId: string, updates: Partial<Section>) => {
    onUpdate({
      ...page,
      sections: page.sections.map(s => 
        s.id === sectionId ? { ...s, ...updates } : s
      ),
    });
  };

  const { setNodeRef } = useDroppable({
    id: 'page-canvas',
  });

  const selectedSection = page.sections.find(s => s.id === selectedSectionId);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex h-full">
        {/* Component palette */}
        <div className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
          <h3 className="font-semibold text-gray-900 mb-4">Components</h3>
          <div className="space-y-2">
            {componentDefinitions.map(component => (
              <DraggableComponent key={component.id} component={component} />
            ))}
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-gray-100 overflow-y-auto p-8">
          <div
            ref={setNodeRef}
            className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg min-h-[600px]"
          >
            {page.sections.length === 0 ? (
              <div className="flex items-center justify-center h-[600px] text-gray-400">
                <div className="text-center">
                  <div className="text-6xl mb-4">📄</div>
                  <p className="text-lg font-medium mb-2">No sections yet</p>
                  <p className="text-sm">Drag components from the left panel to start building your page</p>
                </div>
              </div>
            ) : (
              <div className="space-y-0">
                {page.sections.map((section, index) => (
                  <div
                    key={section.id}
                    className={`relative group ${selectedSectionId === section.id ? 'ring-2 ring-indigo-500' : ''}`}
                    onClick={() => setSelectedSectionId(section.id)}
                  >
                    <SectionRenderer
                      section={section}
                      theme={theme}
                      editMode={false}
                    />
                    
                    {/* Section controls */}
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => { e.stopPropagation(); moveSection(index, -1); }}
                        disabled={index === 0}
                        className="p-1.5 bg-white rounded shadow hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Move up"
                      >
                        ↑
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); moveSection(index, 1); }}
                        disabled={index === page.sections.length - 1}
                        className="p-1.5 bg-white rounded shadow hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Move down"
                      >
                        ↓
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); removeSection(section.id); }}
                        className="p-1.5 bg-white rounded shadow hover:bg-red-50 text-red-600"
                        title="Remove section"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Properties panel */}
        {selectedSection && (
          <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
            <SectionEditor
              section={selectedSection}
              theme={theme}
              onUpdate={(updates) => updateSection(selectedSection.id, updates)}
              onClose={() => setSelectedSectionId(null)}
            />
          </div>
        )}
      </div>
    </DndContext>
  );
}

// Section editor component
function SectionEditor({ section, theme, onUpdate, onClose }: {
  section: Section;
  theme: Theme | ThemeVariant;
  onUpdate: (updates: Partial<Section>) => void;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<'content' | 'animation' | 'style'>('content');

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Section Properties</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded"
        >
          ✕
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('content')}
          className={`px-3 py-2 text-sm font-medium transition-colors ${
            activeTab === 'content'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Content
        </button>
        <button
          onClick={() => setActiveTab('animation')}
          className={`px-3 py-2 text-sm font-medium transition-colors ${
            activeTab === 'animation'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Animation
        </button>
        <button
          onClick={() => setActiveTab('style')}
          className={`px-3 py-2 text-sm font-medium transition-colors ${
            activeTab === 'style'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Style
        </button>
      </div>

      {/* Content tab */}
      {activeTab === 'content' && (
        <div className="space-y-4">
          {Object.entries(section.content).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                {key}
              </label>
              {typeof value === 'string' && value.length > 100 ? (
                <textarea
                  value={value}
                  onChange={(e) => onUpdate({
                    content: { ...section.content, [key]: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows={4}
                />
              ) : typeof value === 'string' ? (
                <input
                  type="text"
                  value={value}
                  onChange={(e) => onUpdate({
                    content: { ...section.content, [key]: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              ) : typeof value === 'number' ? (
                <input
                  type="number"
                  value={value}
                  onChange={(e) => onUpdate({
                    content: { ...section.content, [key]: parseFloat(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              ) : (
                <textarea
                  value={JSON.stringify(value, null, 2)}
                  onChange={(e) => {
                    try {
                      const parsed = JSON.parse(e.target.value);
                      onUpdate({ content: { ...section.content, [key]: parsed } });
                    } catch {}
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm"
                  rows={6}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Animation tab */}
      {activeTab === 'animation' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Animation Type
            </label>
            <select
              value={section.animation?.type || 'none'}
              onChange={(e) => onUpdate({
                animation: {
                  ...section.animation,
                  type: e.target.value as any,
                  duration: section.animation?.duration || 500,
                  delay: section.animation?.delay || 0,
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="none">None</option>
              <option value="fade">Fade</option>
              <option value="slide">Slide</option>
              <option value="scale">Scale</option>
              <option value="bounce">Bounce</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration (ms)
            </label>
            <input
              type="number"
              value={section.animation?.duration || 500}
              onChange={(e) => onUpdate({
                animation: {
                  ...section.animation,
                  duration: parseInt(e.target.value),
                  delay: section.animation?.delay || 0,
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              min="0"
              max="5000"
              step="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Delay (ms)
            </label>
            <input
              type="number"
              value={section.animation?.delay || 0}
              onChange={(e) => onUpdate({
                animation: {
                  ...section.animation,
                  duration: section.animation?.duration || 500,
                  delay: parseInt(e.target.value),
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              min="0"
              max="5000"
              step="100"
            />
          </div>
        </div>
      )}

      {/* Style tab */}
      {activeTab === 'style' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Background Color
            </label>
            <input
              type="color"
              value={section.settings.backgroundColor || theme.tokens.colors.background}
              onChange={(e) => onUpdate({
                settings: { ...section.settings, backgroundColor: e.target.value }
              })}
              className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Padding
            </label>
            <input
              type="text"
              value={section.settings.padding || '4rem 2rem'}
              onChange={(e) => onUpdate({
                settings: { ...section.settings, padding: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="e.g., 4rem 2rem"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Margin
            </label>
            <input
              type="text"
              value={section.settings.margin || '0'}
              onChange={(e) => onUpdate({
                settings: { ...section.settings, margin: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="e.g., 2rem 0"
            />
          </div>
        </div>
      )}
    </div>
  );
}
