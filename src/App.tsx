import Navigation from './Navigation.tsx'
import Content from './Content.tsx'
import CardSection from './section/Card.tsx'
import ModalProvider from './components/ModalProvider.tsx';
import NotificationProvider from './components/NotificationProvider.tsx'; 

function App() {
    return (
        <>

            <Navigation/>


            <main className="pt-24">
                <CardSection/>
                <Content/>
            </main>


            <ModalProvider/>
            <NotificationProvider/>
        </>
    )
}

export default App