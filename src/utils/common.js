function base64(i) {
  return Buffer.from(i, 'utf8').toString('base64');
}

function responseJson() {
  return (res) => {
    if (
      res.status === 500 ||
      res.status == 400
    ) {
      return Promise.reject({
        status: res.status,
        statusText: res.statusText,
        message: new Error(res._bodyText),
      });
    }

    if (!res._bodyInit || !res._bodyText || res._bodyText === '{}') {
      return {}
    } else {
      try {
        JSON.parse(res._bodyText)
      } catch (err) {
        return Promise.reject(err)
      }
    }
    return res.json()
  }
}

function responseStatus() {
  return (res) => {
    if (
      res.status === 500 ||
      res.status == 400
    ) {
      return Promise.reject({
        status: res.status,
        statusText: res.statusText,
        message: res._bodyText
      });
    }

    return {
      status: res.status,
      statusText: res.statusText,
      message: res._bodyText
    };
  }
}

module.exports = {
  base64,
  responseJson,
  responseStatus,
};
