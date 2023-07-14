import { Image, StyleSheet, Text } from 'react-native';

const BackgroundImage = (props: {
  uri: string;
  blur?: number;
  opacity?: number;
}) => {
  return (
    <Image
      style={[Style.absoluteImage, { opacity: props.opacity }]}
      source={{ uri: props.uri }}
      blurRadius={props.blur || 0}
    />
  );
};

const Style = StyleSheet.create({
  absoluteImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BackgroundImage;
