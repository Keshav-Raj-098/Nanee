import { TouchableWithoutFeedback, View } from 'react-native';

type OverlayProps = {
  onPress?: () => void;
};

export default function Overlay({ onPress }: OverlayProps) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          height: '100%',
          width: '100%',
          backgroundColor: 'transparent',
          zIndex: 800,
        }}
      />
    </TouchableWithoutFeedback>
  );
}
