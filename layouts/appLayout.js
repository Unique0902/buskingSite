import AppLayOut from '../components/AppLayOut';

const getAppLayOut = (element) => {
  element.getLayout = function getLayout(page) {
    return <AppLayOut>{page}</AppLayOut>;
  };
};

export { getAppLayOut };
