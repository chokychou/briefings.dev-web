import Header from './Header';
import Nav from './Nav';
import Main from './Main';
import SubscribeButton from './subscribe_button';

export default function Home() {
  return (
    <div className='h-screen bg-gray-100'>
      <Header />
      <Nav />
      <Main />
    </div>
  )
}
