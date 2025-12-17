import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { OrderInfo } from '../order-info';
import { IngredientDetails } from '../ingredient-details';
import {fetchIngredients} from '../../services/slices/ingredientsSlice'
import '../../index.css';
import styles from './app.module.css';
 
import { AppHeader, Modal } from '@components';
import { Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import { Provider } from 'react-redux';



const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // если есть background — значит открываем модалку
  const background = location.state?.background;

  const handleCloseModal = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />

      {/* Основные маршруты */}
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />

        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />

        <Route path='/ingredients/:id' element={<IngredientDetails />} />

        <Route path='/profile' element={<Profile />}>
          <Route path='orders' element={<ProfileOrders />} />
          <Route path='orders/:number' element={<OrderInfo />} />
        </Route>

        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {/* Модальные маршруты */}
      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Ингредиент' onClose={handleCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />

          <Route
            path='/feed/:number'
            element={
              <Modal title='Заказ' onClose={handleCloseModal}>
                <OrderInfo />
              </Modal>
            }
          />

          <Route
            path='/profile/orders/:number'
            element={
              <Modal title='Заказ' onClose={handleCloseModal}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;

