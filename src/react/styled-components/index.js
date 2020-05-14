import React, {
  createContext,
  useState,
  useRef,
  useEffect,
  useContext,
} from "react";
import { ThemeProvider } from "styled-components";

const Context = createContext();

const processTheme = (instance, themeKey) => {
  let theme = instance.props.theme;

  if (instance.processTheme) {
    theme = instance.processTheme(instance, themeKey);
    instance.setProps({ theme });
  }

  return theme;
};

export const UIProvider = (props) => {
  const { instance, theme } = props;

  const { paletteKey, themes } = instance.props.options.theming;

  const defaultTheme = Object.keys(themes)[0];

  const [themeKey, setTheme] = useState(themes[theme] ? theme : defaultTheme);

  const [updating, setUpdating] = useState(false);

  const generatedTheme = useRef(processTheme(instance, themeKey));

  useEffect(() => {
    generatedTheme.current = processTheme(instance, themeKey);
  }, [instance, themeKey]);

  const themeProps = {
    [instance.key(paletteKey)]: themeKey,
  };

  const mode = themes[theme].mode;

  return (
    <Context.Provider
      value={{
        generateUI: (p, localKeys = [], options = {}) => {
          const { scope, fast = true } = options;

          const active = instance.active(p);

          const {
            props: _props,
            global: _global,
            local: _local,
            interactives: _interactives,
          } = instance.properties(p, localKeys, true);

          const props = {
            __active: active,
            ..._props,
            _safe: _props,
            _theme: {
              ...themeProps,
            },
            _global: {
              ..._global,
            },
            _interactives: {
              ..._interactives,
            },
            _local: {
              ..._local,
            },
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
