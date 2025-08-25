import { client } from './client';
import { clientWithoutToken } from './clientWithoutToken';
import { logApi } from './apiUtils';

const apiGetWithoutToken: <T = any>(props: ApiProps) => Promise<T> = async (
  props: ApiProps,
) => {
  try {
    const fullResponse = props?.fullResponse ?? false;
    const resHeaders = props?.resHeaders ?? false;
    const res = await clientWithoutToken.get(props?.url, {
      ...props.config,
      headers: props?.headers,
    });

    logApi({
      nameFunction: 'apiGetWithoutToken',
      tags: props?.tags,
      body: props?.body,
      res: res,
    });

    return Promise.resolve(
      fullResponse ? res : resHeaders ? res?.headers : res?.data,
    );
  } catch (e: any) {
    if ((props.retry ?? 0) > 0) {
      return await apiGet({
        ...props,
        retry: props.retry ? props.retry - 1 : 0,
      });
    }

    logApi({
      nameFunction: 'apiGetWithoutToken',
      tags: props?.tags,
      body: props?.body,
      e: e,
    });

    const errorData = e?.response?.data?.message || 'Terjadi Kesalahan';
    return Promise.reject(errorData);
  }
};

const apiGet: <T = any>(props: ApiProps) => Promise<T> = async (
  props: ApiProps,
) => {
  try {
    const fullResponse = props?.fullResponse ?? false;
    const resHeaders = props?.resHeaders ?? false;
    const res = await client.get(props?.url, {
      ...props.config,
      headers: props?.headers,
    });

    logApi({
      nameFunction: 'apiGet',
      tags: props?.tags,
      body: props?.body,
      res: res,
    });

    return Promise.resolve(
      fullResponse ? res : resHeaders ? res?.headers : res?.data,
    );
  } catch (e: any) {
    if ((props.retry ?? 0) > 0) {
      return await apiGet({
        ...props,
        retry: props.retry ? props.retry - 1 : 0,
      });
    }

    logApi({
      nameFunction: 'apiGet',
      tags: props?.tags,
      body: props?.body,
      e: e,
    });

    const errorData = e?.response?.data?.message || 'Terjadi Kesalahan';
    return Promise.reject(errorData);
  }
};

const apiPostWithoutToken: <T = any>(props: ApiProps) => Promise<T> = async (
  props: ApiProps,
) => {
  try {
    const fullResponse = props?.fullResponse ?? false;
    const res = await clientWithoutToken.post(props?.url, props?.body, {
      ...props.config,
      headers: props?.headers,
    });
    console.log('🚀 ~ apiPostWithoutToken ~ res:', JSON.stringify(res));

    logApi({
      nameFunction: 'apiPostWithoutToken',
      tags: props?.tags,
      body: props?.body,
      res: res,
    });

    return Promise.resolve(fullResponse ? res : res.data);
  } catch (e: any) {
    if ((props.retry ?? 0) > 0) {
      return await apiPost({
        ...props,
        retry: props.retry ? props.retry - 1 : 0,
      });
    }

    logApi({
      nameFunction: 'apiPostWithoutToken',
      tags: props?.tags,
      body: props?.body,
      e: e,
    });

    const errorData = e?.response?.data?.message || 'Terjadi Kesalahan';
    return Promise.reject(errorData);
  }
};

const apiPost: <T = any>(props: ApiProps) => Promise<T> = async (
  props: ApiProps,
) => {
  try {
    const fullResponse = props?.fullResponse ?? false;
    const res = await client.post(props?.url, props?.body, {
      ...props.config,
      headers: props?.headers,
    });

    logApi({
      nameFunction: 'apiPost',
      tags: props?.tags,
      body: props?.body,
      res: res,
    });

    return Promise.resolve(fullResponse ? res : res.data);
  } catch (e: any) {
    if ((props.retry ?? 0) > 0) {
      return await apiPost({
        ...props,
        retry: props.retry ? props.retry - 1 : 0,
      });
    }

    logApi({
      nameFunction: 'apiPost',
      tags: props?.tags,
      body: props?.body,
      e: e,
    });

    const errorData = e?.response?.data?.message || 'Terjadi Kesalahan';
    return Promise.reject(errorData);
  }
};

export { apiGet, apiGetWithoutToken, apiPost, apiPostWithoutToken };
