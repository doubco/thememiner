import React, {
  createContext,
  useState,
  useRef,
  useEffect,
  useContext,
} from "react";
import { ThemeProvider } from "styled-components";

const Context = createContext();

const onGenerateTheme = (instance, themeKey) => {
  let theme = instance.props.theme;

  if (instance.props.onGenerateTheme) {
    theme = instance.props.onGenerateTheme(instance, themeKey);
    instance.setProps({ theme });
  }

  return theme;
};

export const UIProvider = (props) => {
  const { instance, theme } = props;

  const { theming = {} } = instance.props.options || {};
  const { paletteKey, themes } = theming;

  if (!paletteKey) {
    throw Error("Please add 'paletteKey' property to options.theming.");
  }

  if (!themes) {
    throw Error("Please add 'themes' object to options.theming.");
  }

  if (!theming.default) {
    throw Error("Please add 'default' property to options.theming.");
  }

  const [themeKey, setTheme] = useState(
    themes[theme] ? theme : theming.default,
  );

  const [updating, setUpdating] = useState(false);

  const themeProps = {
    [instance.key(paletteKey)]: themeKey,
  };

  const mode = themes[themeKey].mode;

  const generatedTheme = useRef(onGenerateTheme(instance, themeKey));

  useEffect(() => {
    generatedTheme.current = onGenerateTheme(instance, themeKey);
  }, [themeKey]);

  return (
    <Context.Provider
      value={{
        generateUI: (pr, localKeys = [], options = {}, overwrite) => {
          const { scope, cache } = options;

          let p = pr;

          const active = instance.active(p);
          const __active = cache ? active : null;

          if (overwrite) {
            p = { ...pr, ...overwrite(active) };
          }

          const {
            props: _props,
            global: _global,
            local: _local,
            interactives: _interactives,
          } = instance.properties(p, localKeys, true);

          const props = {
            __active,
            ..._props,
            ..._local,
            ..._global,
            _global: { ..._global },
            _interactives: { ..._interactives },
            _parent: { ..._props },
            _local: { ..._local },
            _theme: { ...themeProps },
          };

          return {
            props,
            theme: generatedTheme.current,
            themeKey,
            mode,
            active,
            updating,
            setTheme: (theme, callback) => {
              if (themes[theme]) {
                setUpdating(true);
                setTheme(theme);

                instance.setTheme(theme);

                setTimeout(() => {
                  setUpdating(false);
                  if (callback) callback(theme);
                }, 1);
              }
            },
            get: (key, customProps = {}) => {
              if (scope) {
                const { _ } = instance.scoped(scope);
                return _(key)({ ...props, ...customProps });
              } else {
                return instance._(key)({ ...props, ...customProps });
              }
            },
            closest: (prop = "", value) => {
              const [key, variant] = prop.split(".");
              const next = instance.closest(
                key,
                variant ? active[key].variant : active[key].key,
                value,
                variant ? true : false,
              );

              return next;
            },
          };
        },
      }}
    >
      <ThemeProvider theme={generatedTheme.current}>
        {props.children}
      </ThemeProvider>
    </Context.Provider>
  );
};

export const UIConsumer = Context.Consumer;

export const UIContext = Context;

export const useUI = (...args) => {
  const ctx = useContext(UIContext);

  const context = ctx ? ctx.generateUI(...args) : {};
  return context;
};
