import { Text, TouchableOpacity, View } from 'react-native';

const LoginScreen: React.FC = () => {
  console.log('login screen');
  return (
    <View>
      <TouchableOpacity onPress={() => console.log('login')}>
        <Text>login</Text>
      </TouchableOpacity>
    </View>
  );
};

export { LoginScreen };
