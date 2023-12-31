import styled from '@emotion/styled';
import { css, Theme } from '@emotion/react';

import { EButtonSize, IButtonProps } from '@/components/Button/CommonButton/Button.models';

const getVariantStyles = ({ theme, isPrimary = false }: { theme: Theme; isPrimary?: boolean }) => {
    const {
        colors: { textMain, textInvert, primary, primaryHover, secondary, border },
    } = theme;

    return isPrimary
        ? css`
              color: ${textInvert};
              background-color: ${primary};
              border: 2px solid ${primary};

              :hover {
                  background-color: ${primaryHover};
                  box-shadow: ${primary} 0px 0px 8px 2px inset;
              }
          `
        : css`
              color: ${textMain};
              background-color: ${secondary};
              border: 2px solid ${border};

              :hover {
                  border-color: ${primaryHover};
                  box-shadow: ${primaryHover} 0px 0px 3px 1px inset;
              }
          `;
};

const getSizeStyles = ({
    theme,
    size = EButtonSize.Medium,
}: {
    theme: Theme;
    size?: EButtonSize | 'small' | 'large';
}) => {
    switch (size) {
        case EButtonSize.Small: {
            return css`
                font-size: ${theme.fontSize.sm};
                padding: 0.25rem 0.5rem;
            `;
        }
        case EButtonSize.Large: {
            return css`
                font-size: ${theme.fontSize.lg};
                padding: 0.85rem 1.5rem;
            `;
        }
        case EButtonSize.Medium:
        default: {
            return css`
                font-size: ${theme.fontSize.md};
                padding: 0.7rem 1rem;
            `;
        }
    }
};

const ButtonSC = styled.button<IButtonProps>`
    font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 700;
    //height: 1.5rem;

    border-radius: 0.5em;

    cursor: pointer;
    display: inline-block;
    line-height: 1;

    ${(props) => getVariantStyles(props)}
    ${(props) => getSizeStyles(props)}
    
    ${({ backgroundColor }) =>
        backgroundColor &&
        css`
            background-color: ${backgroundColor};
        `}
`;

export default ButtonSC;
