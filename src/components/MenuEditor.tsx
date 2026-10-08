// Menu editor with drag-and-drop and clone functionality
import { useState } from 'react';
import { DndContext, DragEndEvent, useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { Menu, MenuItem, Page } from '../types';

interface MenuEditorProps {
  menus: Menu[];
  pages: Page[];
  onUpdateMenu: (menu: Menu) => void;
}

function DraggableMenuItem({ item, onEdit, onDelete }: { item: MenuItem; onEdit: () => void; onDelete: () => void }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
  });
  const style = transform ? {
    transform: CSS.Translate.toString(transform),
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-indigo-500 transition-colors"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1" {...listeners} {...attributes}>
          <span className="cursor-move text-gray-400">⋮⋮</span>
          <div className="flex-1">
            <div className="font-medium text-gray-900">{item.label}</div>
            <div className="text-sm text-gray-500">
              {item.type === 'page' ? `Page: ${item.target}` : item.target}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded hover:bg-indigo-200 text-sm"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export function MenuEditor({ menus, pages, onUpdateMenu }: MenuEditorProps) {
  const [selectedMenuId, setSelectedMenuId] = useState<string>(menus[0]?.id || '');
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [showAddItem, setShowAddItem] = useState(false);

  const selectedMenu = menus.find(m => m.id === selectedMenuId);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || !selectedMenu) return;

    const oldIndex = selectedMenu.items.findIndex(item => item.id === active.id);
    const newIndex = selectedMenu.items.findIndex(item => item.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
      const newItems = [...selectedMenu.items];
      const [moved] = newItems.splice(oldIndex, 1);
      newItems.splice(newIndex, 0, moved);
      // Update order
      newItems.forEach((item, i) => item.order = i);
      onUpdateMenu({ ...selectedMenu, items: newItems });
    }
  };

  const addItem = (item: Omit<MenuItem, 'id' | 'order'>) => {
    if (!selectedMenu) return;
    const newItem: MenuItem = {
      ...item,
      id: Date.now().toString(),
      order: selectedMenu.items.length,
    };
    onUpdateMenu({
      ...selectedMenu,
      items: [...selectedMenu.items, newItem],
    });
    setShowAddItem(false);
  };

  const updateItem = (itemId: string, updates: Partial<MenuItem>) => {
    if (!selectedMenu) return;
    onUpdateMenu({
      ...selectedMenu,
      items: selectedMenu.items.map(item =>
        item.id === itemId ? { ...item, ...updates } : item
      ),
    });
    setEditingItem(null);
  };

  const deleteItem = (itemId: string) => {
    if (!selectedMenu) return;
    if (confirm('Are you sure you want to delete this menu item?')) {
      onUpdateMenu({
        ...selectedMenu,
        items: selectedMenu.items.filter(item => item.id !== itemId),
      });
    }
  };

  const updateMenuName = (name: string) => {
    if (!selectedMenu) return;
    onUpdateMenu({ ...selectedMenu, name });
  };

  const updateMenuLocation = (location: Menu['location']) => {
    if (!selectedMenu) return;
    onUpdateMenu({ ...selectedMenu, location });
  };

  return (
    <div className="flex h-full">
      {/* Menu list */}
      <div className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Menus</h3>
          <button
            onClick={() => {
              const newMenu: Menu = {
                id: Date.now().toString(),
                name: 'New Menu',
                location: 'primary',
                items: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              };
              onUpdateMenu(newMenu);
              setSelectedMenuId(newMenu.id);
            }}
            className="p-1 hover:bg-gray-100 rounded"
            title="Add menu"
          >
            +
          </button>
        </div>
        <div className="space-y-2">
          {menus.map(menu => (
            <div
              key={menu.id}
              onClick={() => setSelectedMenuId(menu.id)}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                selectedMenuId === menu.id
                  ? 'bg-indigo-50 border-2 border-indigo-500'
                  : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="font-medium text-sm text-gray-900">{menu.name}</div>
              </div>
              <div className="text-xs text-gray-500">
                {menu.items.length} items • {menu.location}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Menu editor */}
      <div className="flex-1 p-6 overflow-y-auto">
        {selectedMenu ? (
          <div>
            <div className="mb-6">
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Menu Name
                  </label>
                  <input
                    type="text"
                    value={selectedMenu.name}
                    onChange={(e) => updateMenuName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <select
                    value={selectedMenu.location}
                    onChange={(e) => updateMenuLocation(e.target.value as Menu['location'])}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="primary">Primary</option>
                    <option value="utility">Utility</option>
                    <option value="footer">Footer</option>
                    <option value="mobile">Mobile</option>
                    <option value="sidebar">Sidebar</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Menu Items</h3>
              <button
                onClick={() => setShowAddItem(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                + Add Item
              </button>
            </div>

            <DndContext onDragEnd={handleDragEnd}>
              {selectedMenu.items.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                  <p className="text-gray-500 mb-4">No menu items yet</p>
                  <button
                    onClick={() => setShowAddItem(true)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Add First Item
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedMenu.items.map(item => (
                    <DraggableMenuItem
                      key={item.id}
                      item={item}
                      onEdit={() => setEditingItem(item)}
                      onDelete={() => deleteItem(item.id)}
                    />
                  ))}
                </div>
              )}
            </DndContext>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            Select a menu to edit
          </div>
        )}
      </div>

      {/* Add/Edit item modal */}
      {(showAddItem || editingItem) && (
        <MenuItemModal
          pages={pages}
          item={editingItem || undefined}
          onSave={(item) => {
            if (editingItem) {
              updateItem(editingItem.id, item);
            } else {
              addItem(item);
            }
          }}
          onClose={() => {
            setShowAddItem(false);
            setEditingItem(null);
          }}
        />
      )}
    </div>
  );
}

function MenuItemModal({ pages, item, onSave, onClose }: {
  pages: Page[];
  item?: MenuItem;
  onSave: (item: Omit<MenuItem, 'id' | 'order'>) => void;
  onClose: () => void;
}) {
  const [label, setLabel] = useState(item?.label || '');
  const [type, setType] = useState<MenuItem['type']>(item?.type || 'page');
  const [target, setTarget] = useState(item?.target || '');
  const [enabled, setEnabled] = useState(item?.enabled !== false);
  const [openInNewTab, setOpenInNewTab] = useState(item?.openInNewTab || false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (label.trim() && target.trim()) {
      onSave({ label: label.trim(), type, target: target.trim(), children: [], enabled, openInNewTab });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">
            {item ? 'Edit' : 'Add'} Menu Item
          </h3>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Label
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Home, About, Contact, etc."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value as MenuItem['type']);
                setTarget('');
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="page">Page</option>
              <option value="url">External URL</option>
              <option value="anchor">Anchor Link</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="file">File/Download</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {type === 'page' ? 'Select Page' : type === 'url' ? 'URL' : type === 'email' ? 'Email' : type === 'phone' ? 'Phone' : type === 'file' ? 'File Path' : 'Anchor'}
            </label>
            {type === 'page' ? (
              <select
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              >
                <option value="">Select a page...</option>
                {pages.map(page => (
                  <option key={page.id} value={page.slug}>
                    {page.title}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={type === 'url' ? 'url' : type === 'email' ? 'email' : type === 'phone' ? 'tel' : 'text'}
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder={
                  type === 'url' ? 'https://example.com' :
                  type === 'email' ? 'email@example.com' :
                  type === 'phone' ? '+1 (555) 000-0000' :
                  type === 'file' ? '/downloads/file.pdf' :
                  type === 'anchor' ? '#section-id' : ''
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            )}
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={enabled}
                onChange={(e) => setEnabled(e.target.checked)}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">Enabled</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={openInNewTab}
                onChange={(e) => setOpenInNewTab(e.target.checked)}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">Open in new tab</span>
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              {item ? 'Update' : 'Add'} Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
