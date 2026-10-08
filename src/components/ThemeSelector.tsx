import { themes, themeVariants, getThemeVariants } from '../data/themes';
import type { Theme, ThemeVariant } from '../types';

interface ThemeSelectorProps {
  currentThemeId: string;
  currentVariantId?: string;
  onSelectTheme: (themeId: string, variantId?: string) => void;
}

export function ThemeSelector({ currentThemeId, currentVariantId, onSelectTheme }: ThemeSelectorProps) {
  const variants = getThemeVariants(currentThemeId);
  const currentTheme = themes.find(t => t.id === currentThemeId);
  const currentVariant = currentVariantId ? themeVariants.find(v => v.id === currentVariantId) : null;

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Theme Selection</h2>

        {/* Current Theme Display */}
        <div className="bg-white rounded-xl border-2 border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Current Theme</h3>
          <div className="flex items-center gap-6">
            <div
              className="w-32 h-32 rounded-lg"
              style={{
                background: `linear-gradient(135deg, ${(currentVariant || currentTheme)?.colors.primary} 0%, ${(currentVariant || currentTheme)?.colors.secondary} 100%)`,
              }}
            />
            <div className="flex-1">
              <h4 className="text-xl font-bold mb-2">
                {currentVariant?.name || currentTheme?.name}
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                {currentTheme?.category}
              </p>
              <div className="flex gap-2">
                {Object.entries((currentVariant || currentTheme)?.colors || {}).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div
                      className="w-12 h-12 rounded-lg border-2 border-gray-200 mb-1"
                      style={{ backgroundColor: value }}
                    />
                    <div className="text-xs text-gray-500">{key}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Base Themes */}
        <div className="bg-white rounded-xl border-2 border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Base Themes</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {themes.map(theme => (
              <button
                key={theme.id}
                onClick={() => onSelectTheme(theme.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  currentThemeId === theme.id && !currentVariantId
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div
                  className="h-20 rounded mb-3"
                  style={{
                    background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`,
                  }}
                />
                <div className="text-sm font-medium text-gray-900">{theme.name}</div>
                <div className="text-xs text-gray-500">{theme.category}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Theme Variants */}
        {variants.length > 0 && (
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">
              Variants for {currentTheme?.name}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {variants.map(variant => (
                <button
                  key={variant.id}
                  onClick={() => onSelectTheme(currentThemeId, variant.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    currentVariantId === variant.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div
                    className="h-20 rounded mb-3"
                    style={{
                      background: `linear-gradient(135deg, ${variant.colors.primary} 0%, ${variant.colors.secondary} 100%)`,
                    }}
                  />
                  <div className="text-sm font-medium text-gray-900">{variant.name}</div>
                  <div className="text-xs text-gray-500">Variant</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
