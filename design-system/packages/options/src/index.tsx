/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from '@keystone-ui/core';
import { useIndicatorTokens } from '@keystone-ui/fields';
import { CheckIcon } from '@keystone-ui/icons/icons/CheckIcon';
import { useMemo } from 'react';
import ReactSelect, {
  StylesConfig,
  components as reactSelectComponents,
  Props,
} from 'react-select';

export const CheckMark = ({
  isDisabled,
  isFocused,
  isSelected,
}: {
  isDisabled?: boolean;
  isFocused?: boolean;
  isSelected?: boolean;
}) => {
  const tokens = useIndicatorTokens({
    size: 'medium',
    type: 'radio',
  });

  return (
    <div
      className={`${isDisabled ? 'disabled ' : ''}${isFocused ? 'focus ' : ''}${
        isSelected ? 'selected' : ''
      }`}
      css={{
        alignItems: 'center',
        backgroundColor: tokens.background,
        borderColor: tokens.borderColor,
        borderRadius: tokens.borderRadius,
        borderStyle: 'solid',
        borderWidth: tokens.borderWidth,
        boxSizing: 'border-box',
        color: tokens.foreground,
        cursor: 'pointer',
        display: 'flex',
        flexShrink: 0,
        height: tokens.boxSize,
        justifyContent: 'center',
        transition: tokens.transition,
        width: tokens.boxSize,

        '&.focus': {
          backgroundColor: tokens.focus.background,
          borderColor: tokens.focus.borderColor,
          boxShadow: tokens.focus.shadow,
          color: tokens.focus.foreground,
        },
        '&.selected': {
          backgroundColor: tokens.selected.background,
          borderColor: tokens.selected.borderColor,
          boxShadow: tokens.selected.shadow,
          color: tokens.selected.foreground,
        },
        '&.disabled': {
          backgroundColor: tokens.disabled.background,
          borderColor: tokens.disabled.borderColor,
          boxShadow: tokens.disabled.shadow,
          color: tokens.disabled.background,
          cursor: 'default',
        },
        '&.selected.disabled': {
          color: tokens.disabled.foreground,
        },
      }}
    >
      <CheckIcon size="small" />
    </div>
  );
};

export const OptionPrimitive: (typeof reactSelectComponents)['Option'] = ({
  children,
  isDisabled,
  isFocused,
  innerProps,
  innerRef,
  className,
}) => {
  const theme = useTheme();
  return (
    <div
      ref={innerRef}
      className={className}
      css={{
        alignItems: 'center',
        color: isDisabled
          ? theme.colors.foregroundDim
          : isFocused
          ? theme.colors.linkHoverColor
          : undefined,
        cursor: 'pointer',
        display: 'flex',
        fontSize: '0.9em',
        fontWeight: 500,
        justifyContent: 'space-between',
        background: isFocused ? theme.colors.backgroundHover : undefined,
        outline: 0,
        padding: `${theme.spacing.small}px`,
        pointerEvents: isDisabled ? 'none' : undefined,

        '&:not(:first-of-type)': {
          borderTop: `1px solid ${theme.colors.backgroundDim}`,
        },
        ':hover': {
          background: theme.colors.backgroundHover,
          color: theme.colors.linkHoverColor,
        },
      }}
      {...innerProps}
    >
      {children}
    </div>
  );
};

const Control: (typeof reactSelectComponents)['Control'] = ({ selectProps, ...props }) => {
  return <reactSelectComponents.Control selectProps={selectProps} {...props} />;
};

const defaultComponents = {
  Control,
  Option: OptionPrimitive,
  DropdownIndicator: null,
  IndicatorSeparator: null,
};

type OptionsProps = Props<{ label: string; value: string; isDisabled?: boolean }, boolean>;

export const Options = ({ components: propComponents, ...props }: OptionsProps) => {
  const components = useMemo(
    () => ({
      ...defaultComponents,
      ...propComponents,
    }),
    [propComponents]
  );
  const theme = useTheme();

  const optionRendererStyles: StylesConfig<{ label: string; value: string; isDisabled?: boolean }> =
    useMemo(
      () => ({
        control: (provided: any) => ({
          ...provided,
          background: theme.fields.inputBackground,
          boxShadow: 'none',
          cursor: 'text',
          padding: 0,
          minHeight: 34,
        }),
        menu: () => ({
          marginTop: 8,
        }),
        menuList: (provided: any) => ({
          ...provided,
          padding: 0,
        }),
        placeholder: (provided: any) => ({
          ...provided,
          color: theme.fields.inputPlaceholder,
        }),
      }),
      [theme]
    );

  return (
    <ReactSelect
      backspaceRemovesValue={false}
      captureMenuScroll={false}
      closeMenuOnSelect={false}
      controlShouldRenderValue={false}
      hideSelectedOptions={false}
      isClearable={false}
      isSearchable
      maxMenuHeight={1000}
      menuIsOpen
      menuShouldScrollIntoView={false}
      styles={optionRendererStyles}
      // TODO: JW: Not a fan of this, but it doesn't seem to make a difference
      // if we take it out. react-select bug maybe?
      tabSelectsValue={false}
      components={components as any}
      {...props}
    />
  );
};
