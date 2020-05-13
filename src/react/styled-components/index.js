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
  const { instance } = props;

  const { paletteKey } = instance.props.options;

  const palette = instance.props.theme[paletteKey];

  const [themeKey, setTheme] = useState(
    palette[props.theme] ? props.theme : instance.props.defaultTheme,
  );

  const [updating, setUpdating] = useState(false);

  const generatedTheme = useRef(processTheme(instance, themeKey));

  useEffect(() => {
    generatedTheme.current = processTheme(instance, themeKey);
  }, [instance, themeKey]);

  const themeProps = {
    [instance.key(paletteKey)]: themeKey,
  };

  const mode = palette[props.theme].mode;

  return (
    <Context.Provider
      value={{
        generateUI: (p, ignored = [], options = {}) => {
          const { scope } = options;

          const active = instance.active(p);

          const props = {
            ...instance.properties(p, ignored),
            __active: active,
          };

          return {
            props,
            themeProps,
            rawTheme: instance.props.theme,
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

              return instance.closest(
                key,
                variant ? variant : key,
                value,
                variant ? true : false,
              );
            },
            _getExpensiveProps: () => instance.properties(this.props, []),
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
  const context = useContext(UIContext).generateUI(...args);
  return context;
};
