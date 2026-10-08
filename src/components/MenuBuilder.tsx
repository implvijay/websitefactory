import { useState } from 'react';
import type { Menu, MenuItem, Page } from '../types';
import { DndContext, DragEndEvent, useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

interface MenuBuilderProps {
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

export function MenuBuilder({ menus, pages, onUpdateMenu }: MenuBuilderProps) {
  const [selectedMenuId, setSelectedMenuId] = useState<string>(menus[0]?.id || '');
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [showAddItem, setShowAddItem] = useState(false);

  const selectedMenu = menus.find(m => m.id === selectedMenuId);

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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || !selectedMenu) return;

    const oldIndex = selectedMenu.items.findIndex(item => item.id === active.id);
    const newIndex = selectedMenu.items.findIndex(item => item.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const newItems = [...selectedMenu.items];
      const [moved] = newItems.splice(oldIndex, 1);
      newItems.splice(newIndex, 0, moved);
      onUpdateMenu({ ...selectedMenu, items: newItems });
    }
  };

  const updateMenuLocation = (location: Menu['location']) => {
    if (!selectedMenu) return;
    onUpdateMenu({ ...selectedMenu, location });
  };

  const updateMenuName = (name: string) => {
    if (!selectedMenu) return;
    onUpdateMenu({ ...selectedMenu, name });
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Menu Builder</h2>

        {menus.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border-2 border-gray-200">
            <p className="text-gray-500">No menus yet. Add a menu to get started.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Menu Selector */}
            <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
              <div className="flex gap-4 items-center">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Menu
                  </label>
                  <select
                    value={selectedMenuId}
                    onChange={(e) => setSelectedMenuId(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    {menus.map(menu => (
                      <option key={menu.id} value={menu.id}>
                        {menu.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Menu Name
                  </label>
                  <input
                    type="text"
                    value={selectedMenu?.name || ''}
                    onChange={(e) => updateMenuName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <select
                    value={selectedMenu?.location || 'header'}
                    onChange={(e) => updateMenuLocation(e.target.value as Menu['location'])}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="header">Header</option>
                    <option value="footer">Footer</option>
                    <option value="sidebar">Sidebar</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            {selectedMenu && (
              <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Menu Items</h3>
                  <button
                    onClick={() => setShowAddItem(true)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    + Add Item
                  </button>
                </div>

                {selectedMenu.items.length === 0 ? (
                  <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                    <p className="text-gray-500 mb-4">No menu items yet</p>
                    <button
                      onClick={() => setShowAddItem(true)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                      Add First Item
                    </button>
                  </div>
                ) : (
                  <DndContext onDragEnd={handleDragEnd}>
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
                  </DndContext>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Item Modal */}
      {showAddItem && (
        <MenuItemModal
          pages={pages}
          onSave={addItem}
          onClose={() => setShowAddItem(false)}
        />
      )}

      {/* Edit Item Modal */}
      {editingItem && (
        <MenuItemModal
          pages={pages}
          item={editingItem}
          onSave={(updates) => updateItem(editingItem.id, updates)}
          onClose={() => setEditingItem(null)}
        />
      )}
    </div>
  );
}

function MenuItemModal({
  pages,
  item,
  onSave,
  onClose,
}: {
  pages: Page[];
  item?: MenuItem;
  onSave: (item: Omit<MenuItem, 'id' | 'order'>) => void;
  onClose: () => void;
}) {
  const [label, setLabel] = useState(item?.label || '');
  const [type, setType] = useState<MenuItem['type']>(item?.type || 'page');
  const [target, setTarget] = useState(item?.target || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (label.trim() && target.trim()) {
      onSave({ label: label.trim(), type, target: target.trim() });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold">{item ? 'Edit' : 'Add'} Menu Item</h3>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Label
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Home, About, Contact, etc."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value as MenuItem['type']);
                setTarget('');
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="page">Page</option>
              <option value="url">External URL</option>
              <option value="anchor">Anchor Link</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {type === 'page' ? 'Select Page' : type === 'url' ? 'URL' : 'Anchor'}
            </label>
            {type === 'page' ? (
              <select
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
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
                type={type === 'url' ? 'url' : 'text'}
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder={type === 'url' ? 'https://example.com' : '#section-id'}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            )}
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
