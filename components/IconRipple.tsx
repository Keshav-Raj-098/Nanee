import React from 'react';
import { TouchableHighlight } from 'react-native';

type IconProps = {
    onPress?: () => void;
    icon?: React.ReactNode;
}


export default function Icon_WithRippleEffect({ icon, onPress }: IconProps) {
    return (
        <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="rgba(255,255,255,0.2)"
            onPress={onPress}
            style={{ padding: 5, borderRadius: 999 }}
        >
            {icon && icon}
        </TouchableHighlight>
    )
}
