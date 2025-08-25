import Reactotron, {
  networking,
  openInEditor,
  trackGlobalErrors,
} from 'reactotron-react-native';

const reactotron = Reactotron.configure({ name: 'nomie' })
  .useReactNative()
  .use(networking())
  .use(openInEditor())
  .use(trackGlobalErrors())
  .connect();

export default reactotron;
