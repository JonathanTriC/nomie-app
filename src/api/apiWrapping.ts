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

    if (e.response) {
      console.log('🚀 ~ apiGetWithoutToken ~ status:', e.response.status);
      console.log('🚀 ~ apiGetWithoutToken ~ data:', e.response.data);
    } else if (e.request) {
      console.log('🚀 ~ apiGetWithoutToken ~ request:', e.request);
    } else {
      console.log('🚀 ~ apiGetWithoutToken ~ message:', e.message);
    }
    const errData = e.response?.data ?? e.message;

    logApi({
      nameFunction: 'apiGetWithoutToken',
      tags: props?.tags,
      body: props?.body,
      e: errData,
    });

    const errorData = {
      status: e?.response?.status,
      message: errData || 'Terjadi Kesalahan',
      data: e?.response?.data,
    };

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

    if (e.response) {
      console.log('🚀 ~ apiGet ~ status:', e.response.status);
      console.log('🚀 ~ apiGet ~ data:', e.response.data);
    } else if (e.request) {
      console.log('🚀 ~ apiGet ~ request:', e.request);
    } else {
      console.log('🚀 ~ apiGet ~ message:', e.message);
    }
    const errData = e.response?.data ?? e.message;

    logApi({
      nameFunction: 'apiGet',
      tags: props?.tags,
      body: props?.body,
      e: errData,
    });

    const errorData = {
      status: e?.response?.status,
      message: errData || 'Terjadi Kesalahan',
      data: e?.response?.data,
    };

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

    if (e.response) {
      console.log('🚀 ~ apiPostWithoutToken ~ status:', e.response.status);
      console.log('🚀 ~ apiPostWithoutToken ~ data:', e.response.data);
    } else if (e.request) {
      console.log('🚀 ~ apiPostWithoutToken ~ request:', e.request);
    } else {
      console.log('🚀 ~ apiPostWithoutToken ~ message:', e.message);
    }
    const errData = e.response?.data ?? e.message;

    logApi({
      nameFunction: 'apiPostWithoutToken',
      tags: props?.tags,
      body: props?.body,
      e: errData,
    });

    const errorData = {
      status: e?.response?.status,
      message: errData || 'Terjadi Kesalahan',
      data: e?.response?.data,
    };

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

    if (e.response) {
      console.log('🚀 ~ apiPost ~ status:', e.response.status);
      console.log('🚀 ~ apiPost ~ data:', e.response.data);
    } else if (e.request) {
      console.log('🚀 ~ apiPost ~ request:', e.request);
    } else {
      console.log('🚀 ~ apiPost ~ message:', e.message);
    }
    const errData = e.response?.data ?? e.message;

    logApi({
      nameFunction: 'apiPost',
      tags: props?.tags,
      body: props?.body,
      e: errData,
    });

    const errorData = {
      status: e?.response?.status,
      message: errData || 'Terjadi Kesalahan',
      data: e?.response?.data,
    };

    return Promise.reject(errorData);
  }
};

const apiDeleteWithoutToken: <T = any>(props: ApiProps) => Promise<T> = async (
  props: ApiProps,
) => {
  try {
    const fullResponse = props?.fullResponse ?? false;
    const resHeaders = props?.resHeaders ?? false;
    // Using clientWithoutToken.delete method
    const res = await clientWithoutToken.delete(props?.url, {
      ...props.config,
      headers: props?.headers,
      data: props?.body, // DELETE requests can include a body via the `data` property in config
    });

    logApi({
      nameFunction: 'apiDeleteWithoutToken',
      tags: props?.tags,
      body: props?.body,
      res: res,
    });

    return Promise.resolve(
      fullResponse ? res : resHeaders ? res?.headers : res?.data,
    );
  } catch (e: any) {
    // On retry, calls the version with a token, following your existing pattern
    if ((props.retry ?? 0) > 0) {
      return await apiDelete({
        ...props,
        retry: props.retry ? props.retry - 1 : 0,
      });
    }

    if (e.response) {
      console.log('🚀 ~ apiDeleteWithoutToken ~ status:', e.response.status);
      console.log('🚀 ~ apiDeleteWithoutToken ~ data:', e.response.data);
    } else if (e.request) {
      console.log('🚀 ~ apiDeleteWithoutToken ~ request:', e.request);
    } else {
      console.log('🚀 ~ apiDeleteWithoutToken ~ message:', e.message);
    }
    const errData = e.response?.data ?? e.message;

    logApi({
      nameFunction: 'apiDeleteWithoutToken',
      tags: props?.tags,
      body: props?.body,
      e: errData,
    });

    const errorData = {
      status: e?.response?.status,
      message: errData || 'Terjadi Kesalahan',
      data: e?.response?.data,
    };

    return Promise.reject(errorData);
  }
};

const apiDelete: <T = any>(props: ApiProps) => Promise<T> = async (
  props: ApiProps,
) => {
  try {
    const fullResponse = props?.fullResponse ?? false;
    const resHeaders = props?.resHeaders ?? false;
    // Using client.delete method
    const res = await client.delete(props?.url, {
      ...props.config,
      headers: props?.headers,
      data: props?.body, // DELETE requests can include a body via the `data` property in config
    });

    logApi({
      nameFunction: 'apiDelete',
      tags: props?.tags,
      body: props?.body,
      res: res,
    });

    return Promise.resolve(
      fullResponse ? res : resHeaders ? res?.headers : res?.data,
    );
  } catch (e: any) {
    if ((props.retry ?? 0) > 0) {
      return await apiDelete({
        ...props,
        retry: props.retry ? props.retry - 1 : 0,
      });
    }

    if (e.response) {
      console.log('🚀 ~ apiDelete ~ status:', e.response.status);
      console.log('🚀 ~ apiDelete ~ data:', e.response.data);
    } else if (e.request) {
      console.log('🚀 ~ apiDelete ~ request:', e.request);
    } else {
      console.log('🚀 ~ apiDelete ~ message:', e.message);
    }
    const errData = e.response?.data ?? e.message;

    logApi({
      nameFunction: 'apiDelete',
      tags: props?.tags,
      body: props?.body,
      e: errData,
    });

    const errorData = {
      status: e?.response?.status,
      message: errData || 'Terjadi Kesalahan',
      data: e?.response?.data,
    };

    return Promise.reject(errorData);
  }
};

export {
  apiGet,
  apiGetWithoutToken,
  apiPost,
  apiPostWithoutToken,
  apiDelete,
  apiDeleteWithoutToken,
};
