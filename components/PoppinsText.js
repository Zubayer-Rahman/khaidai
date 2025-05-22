import { Text } from 'react-native';
import { fontConfig } from '../constants/Fonts';

export default function PoppinsText({
  children,
  weight = 400,
  style,
  ...props
}) {
  return (
    <Text
      style={[
        {
          fontFamily: fontConfig.Poppins[weight].normal,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}