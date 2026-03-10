import { Suspense, use, useMemo, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const getData = () =>
  new Promise<string>(resolve => {
    setTimeout(() => {
      resolve('data');
    }, 4000);
  });

export const Screen = () => {
  const [counter, setCounter] = useState(0);
  const message = useMemo(() => getData(), []);
  //   console.log(data);

  console.log('TEST');

  const increment = () => {
    let timeout = setTimeout(() => {
      setCounter(counter + 1);
      clearTimeout(timeout);
    }, 4000);
  };

  return (
    <SafeAreaView>
      <View>
        <Text>{counter}</Text>
        <Button title={`Increment ${counter}`} onPress={increment} />
      </View>
      <Suspense fallback={<Text>Loading...</Text>}>
        <Component message={message} />
      </Suspense>
    </SafeAreaView>
  );
};

const Component = ({ message }: { message: Promise<string> }) => {
  const data = use(message);
  return (
    <View>
      <Text>{data}</Text>
    </View>
  );
};
