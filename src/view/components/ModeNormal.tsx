import 'src/scss/view/components/modeNormal.scss';
import HdgHeader from 'src/view/components/HdgHeader'
import CalendarTable from 'src/view/components/CalendarTable'

function ModeNormal() {

    return (
        <div className="modeNormal">
            <HdgHeader></HdgHeader>
            <CalendarTable></CalendarTable>
        </div>
    )
}

export default ModeNormal;