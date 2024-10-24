import { useSelector } from 'react-redux';

const ProtectedRoute = ({ protocol, children }) => {

    const {
        protocols,
        fetchProtocolsStatus
    } = useSelector(store => store.dashboard);

    if (fetchProtocolsStatus === 'pending' || fetchProtocolsStatus === false) {
        return <div>Загрузка</div>;
    }

    if (fetchProtocolsStatus === 'fulfilled') {
        const isProtocolConsist = (protocols.filter(({ name }) => name === protocol)).length;

        if (!isProtocolConsist) {
            return <div>Протокол не поддерживается</div>
        }
    }

    return children;
}

export default ProtectedRoute;
