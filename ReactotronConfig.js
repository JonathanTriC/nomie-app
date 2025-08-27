import Reactotron, {
  networking,
  openInEditor,
  trackGlobalErrors,
} from 'reactotron-react-native';

const reactotron = Reactotron.configure({ name: 'nomie' })
  .useReactNative()
  .use(
    networking({
      ignoreUrls: /symbolicate|generate_204/,
    }),
  )
  .use(openInEditor())
  .use(trackGlobalErrors())
  .connect();

export default reactotron;
