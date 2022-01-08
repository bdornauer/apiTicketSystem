import React, {useState} from 'react';
//Icons
import arrowLeft from './icons/arrowLeft.svg'
import arrowRight from './icons/arrowRight.svg'
import arrowUp from './icons/arrowUp.svg'
import arrowDown from './icons/arrowDown.svg'
import contrastMinus from './icons/contrastMinus.svg'
import contrastPlus from './icons/contrastPlus.svg'
import menu1 from './icons/menu1.svg'
import menu2 from './icons/menu2.svg'
import minus from './icons/minus.svg'
import plus from './icons/plus.svg'
import saturationMinus from './icons/saturationMinus.svg'
import saturationPlus from './icons/saturationPlus.svg'
import zoomIn from './icons/ZoomIn.svg'
import zoomOut from './icons/ZoomOut.svg'
import Icon from "./Icon";
//Show
import css from './CommandPallet.css';


function ControlBar() {
    const iconSetting = {width: 70, height: 70};

    const [activeStatus, setActiveStatus] = useState(
        {
            arrowLeftActive: false,
            arrowRightActive: false,
            arrowUpActive: false,
            arrowDownActive: false,
            cancelActive: false,
            contrastMinusActive: false,
            contrastPlusActive: false,
            menu1Active: false,
            menu2Active: false,
            plusActive: false,
            minusActive: false,
            saturationMinusActive: false,
            saturationPlusActive: false,
            zoomInActive: false,
            zoomOutActive: false,
        }
    );

    function switchMenu() {
        setActiveStatus(prevState => ({
            ...prevState, menu1Active: !prevState.menu1Active
        }));
    }

    function menuBar2() {
        return (<div>
            <div className={css.containerIcons}>
                <Icon icon={saturationPlus} isActive={activeStatus.saturationPlusActive} width={iconSetting.width}
                      height={iconSetting.height}/>
                <Icon icon={saturationMinus} isActive={activeStatus.saturationMinusActive} width={iconSetting.width}
                      height={iconSetting.height}/>
                <Icon icon={contrastPlus} isActive={activeStatus.contrastPlusActive} width={iconSetting.width}
                      height={iconSetting.height}/>
                <Icon icon={contrastMinus} isActive={activeStatus.contrastMinusActive} width={iconSetting.width}
                      height={iconSetting.height}/>
                <Icon icon={menu1} isActive={activeStatus.menu1Active} width={iconSetting.width}
                      height={iconSetting.height}/>
            </div>
        </div>)
    }


    function menuBar1() {
        return (<div>
            <div className={css.containerIcons}>
                <Icon icon={zoomIn} isActive={activeStatus.zoomInActive} width={iconSetting.width}
                      height={iconSetting.height}/>
                <Icon icon={zoomOut} isActive={activeStatus.zoomOutActive} width={iconSetting.width}
                      height={iconSetting.height}/>
                <Icon icon={arrowLeft} isActive={activeStatus.arrowLeftActive} width={iconSetting.width}
                      height={iconSetting.height}/>
                <Icon icon={arrowUp} isActive={activeStatus.arrowUpActive} width={iconSetting.width}
                      height={iconSetting.height}/>
                <Icon icon={arrowDown} isActive={activeStatus.arrowDownActive} width={iconSetting.width}
                      height={iconSetting.height}/>
                <Icon icon={arrowRight} isActive={activeStatus.arrowRightActive} width={iconSetting.width}
                      height={iconSetting.height}/>
                <Icon icon={plus} isActive={activeStatus.plusActive} width={iconSetting.width}
                      height={iconSetting.height}/>
                <Icon icon={minus} isActive={activeStatus.minusActive} width={iconSetting.width}
                      height={iconSetting.height}/>
                <Icon icon={menu2} isActive={activeStatus.menu1Active} width={iconSetting.width}
                      height={iconSetting.height}/>
            </div>

        </div>)
    }


    return (
        <div style={{margin: "20px"}}>
            {activeStatus.menu1Active? menuBar2(): menuBar1()}
        </div>
    )
        ;
}


export default ControlBar;