import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import {  addTicketsAction, selectTicketsAction, isCheckedAction, filterCheckedAction, filterFromAction, filterToAction, } from '../store/ticketsReducer';

const SideBar = (props) => {
    const dispath = useDispatch()
    const state = useSelector( state => state)
    console.log(state.tickets.isChecked)
// props.ChangeMethod
    
    return (
        <div className=" sidebar row">
            <div onChange={event => dispath(isCheckedAction(1))} className="sidebar_checkbox col-12 row">
                <input  defaultChecked  type="radio"  name="sort_input" value="sort_radio1"/>
                <div className="sidebar_sort_name ">- по возрастанию цены</div>
            </div>

            <div onChange={event => dispath(isCheckedAction(2))}   className="sidebar_checkbox col-12  row">
                <input  className="" type="radio" name="sort_input" value="sort_radio2"/>
                <div className="sidebar_sort_name ">- по убыванию цены </div>
            </div>

            <div onChange={event => dispath(isCheckedAction(3))} className="sidebar_checkbox col-12  row">
                <input type="radio" name="sort_input" value="sort_radio3"/>
                <div className="sidebar_sort_name ">- по времени в пути</div>
            </div>


            <div className="filter_name">Фильтровать</div>
            <div onChange={event => dispath(filterCheckedAction(0))} className="sidebar_checkbox col-12 row">
            <input defaultChecked   type="radio"  name="filter_input" value="filter_radio0"/>
                <div className="sidebar_filter_name ">- все</div>
            </div>
            <div onChange={event => dispath(filterCheckedAction(1))} className="sidebar_checkbox col-12 row">
            <input    type="radio"  name="filter_input" value="filter_radio1"/>
                <div className="sidebar_filter_name ">- одна пересадка</div>
            </div>
            <div onChange={event => dispath(filterCheckedAction(2))} className="sidebar_checkbox col-12 row">
            <input    type="radio"  name="filter_input" value="filter_radio2"/>
                <div className="sidebar_filter_name ">- без пересадок</div>
            </div>


            <div className="filter_price_name">Цена</div>
            <div  className="sidebar_checkbox col-12 row">
            <div className="sidebar_filter_name ">От</div>
            <input onChange={event => dispath(filterFromAction(Number(event.target.value)))}   type="number" defaultValue="0"  name="filter_input" />
            </div>
            <div className="sidebar_checkbox col-12 row">
            <div className="sidebar_filter_name ">До</div>
            <input  onChange={event => dispath(filterToAction(Number(event.target.value)))}   type="number" defaultValue="99999"  name="filter_input"/>
            </div>



        </div>
    );
};

export default SideBar;