import './App.sass';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTicketsAction, selectTicketsAction, addElemAction } from './store/ticketsReducer';
import Search from './components/search';
import SideBar from './components/sideBar';

function App() {
  const dispathc = useDispatch()
  const state = useSelector(state => state)
  const In = "Москва";
  const Out = "PAR";
  let filter_flights = [];
  let map_i = 0;
  let map_i_max = 100;
  let filter_departureCity = [];
  let isChecked = state.tickets.isChecked;
  let filterChecked = state.tickets.filterChecked;
  let fromValue = Number(state.tickets.filterFrom);
  let toValue = Number(state.tickets.filterTo);
  let pagination = 2
  let filtred

  const addElem = () => {
    dispathc(addElemAction(5))
  }

  for (let i = 1; i <= 100; i++) {
    if (filterChecked == 0) {
      if (state.tickets.tickets[0].result.flights[i].flight.legs[0].segments[1]?.arrivalCity?.caption !== undefined) {
        if (state.tickets.tickets[0].result.flights[i].flight?.price?.passengerPrices[0]?.feeAndTaxes.amount >= fromValue & state.tickets.tickets[0].result.flights[i].flight?.price?.passengerPrices[0]?.feeAndTaxes.amount < toValue) {
          filter_flights.push(state.tickets.tickets[0].result.flights[i])
        }
      }
    }
    if (filterChecked == 1) {
      if (state.tickets.tickets[0].result.flights[i].flight.legs[0].segments[1]?.arrivalCity?.caption !== undefined && state.tickets.tickets[0].result.flights[i].flight.legs[1].segments[1]?.arrivalCity?.caption) {
        if (state.tickets.tickets[0].result.flights[i].flight?.price?.passengerPrices[0]?.feeAndTaxes.amount >= fromValue & state.tickets.tickets[0].result.flights[i].flight?.price?.passengerPrices[0]?.feeAndTaxes.amount < toValue) {
          filter_flights.push(state.tickets.tickets[0].result.flights[i])
        }
      }
    }
    if (filterChecked == 2) {
      if (state.tickets.tickets[0].result.flights[i].flight.legs[0].segments[1]?.arrivalCity?.caption !== undefined && state.tickets.tickets[0].result.flights[i].flight.legs[1].segments[1]?.arrivalCity?.caption == undefined) {
        if (state.tickets.tickets[0].result.flights[i].flight?.price?.passengerPrices[0]?.feeAndTaxes.amount >= fromValue & state.tickets.tickets[0].result.flights[i].flight?.price?.passengerPrices[0]?.feeAndTaxes.amount < toValue) {
          filter_flights.push(state.tickets.tickets[0].result.flights[i])
        }
      }
    }


  }

  if (isChecked == 1) {
    filter_flights.sort((a, b) => a.flight.price.passengerPrices[0].feeAndTaxes.amount - b.flight.price.passengerPrices[0].feeAndTaxes.amount)
  }
  if (isChecked == 2) {
    filter_flights.sort((a, b) => b.flight.price.passengerPrices[0].feeAndTaxes.amount - a.flight.price.passengerPrices[0].feeAndTaxes.amount)
  }
  if (isChecked == 3) {
    filter_flights.sort((a, b) => a.flight.legs[0].duration - b.flight.legs[0].duration)
  }
  if (fromValue != 0 & toValue <= 99999) {

    filtred = filter_flights.reduce(function (newArr, filter_flights) {
      if (filter_flights.flight.price.passengerPrices[0].feeAndTaxes.amount >= Number(fromValue)) {
        newArr.push(filter_flights.flight.price.passengerPrices[0].feeAndTaxes.amount);
      }
      if (filter_flights.flight.price.passengerPrices[0].feeAndTaxes.amount <= Number(toValue)) {
        newArr.push(filter_flights.flight.price.passengerPrices[0].feeAndTaxes.amount);
      }
      return newArr;
    }, []);


  }

  const data_flights = filter_flights.map((item) => {
    let days = ["во", "по", "вт", "ср", "чт", "пт", "сб"];
    let montch = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек",];


    let new_date = (new_legs, new_segment) => {
      let tickets_date = new Date(item.flight.legs[new_legs].segments[new_segment]?.arrivalDate)
      let tickets_min = tickets_date.getMinutes()
      let tickets_time = tickets_date.getHours() + ":" + tickets_date.getMinutes()
      let tickets_new_date = " " + tickets_date.getDate() + " " + montch[tickets_date.getMonth()] + "." + " " + days[tickets_date.getDay()]
      return (
        [tickets_time, tickets_new_date]
      )
    }

    map_i++
    if (map_i < map_i_max) {
      return (
        <div className="row header_tickets col-12 justify-content-center ">
          <div className="col-12 legs_2">
            <div className=" col-12">
              <div className="tickets_price row ">
                <div className="tickets_price_title ">{item.flight.price.passengerPrices[0].feeAndTaxes.amount} р</div>
                <div className="col-12"></div>
                <div className="tickets_price_subtitle"> Стоимость для одного пассажира</div>
              </div>

            </div>

            <div className="in_out col-12 row">
              <div className="in  d-flex">{item.flight.legs[0].segments[0]?.departureCity?.caption + "," + item.flight.legs[0].segments[0].departureAirport?.caption} <div className="in_out_title">({item.flight.legs[0].segments[0].departureAirport?.uid})</div> </div>
              <div className="arrow  ">
                <div className="arrow_item ">&#10230;</div>

              </div>
              <div className="out d-flex">{item.flight.legs[0].segments[1].arrivalCity?.caption + "," + item.flight.legs[0].segments[1].arrivalAirport?.caption} <div className="in_out_title">({item.flight.legs[0].segments[1].departureAirport?.uid})</div></div>
            </div>
            <div className="in_out_hr"></div>



            <div className="air_date col-12 row">
              <div className="arrival_date d-flex col-4">
                {new_date(0, 0)[0]}
                <div className="tickets_date">
                  {new_date(0, 0)[1]}
                </div>
              </div>
              <div className="tickets_time col-4">
                {Math.floor(item.flight.legs[0].duration / 60) + " ч " + (item.flight.legs[0].duration % 60) + " мин"}
              </div>
              <div className="arrival_date d-flex col-4">

                <div className="tickets_date">
                  {new_date(0, 1)[1]}
                </div>
                {new_date(0, 1)[0]}

              </div>
            </div>

            <div className="tickets_transfer justify-content-center row col-12 ">
              <div className="tickets_transfer_hr"></div>
              <div className="tickets_transfer_title">1 пересадка</div>
              <div className="tickets_transfer_hr"></div>

            </div>

            <div className="carrier  col-12">
              Рейс выполняет: {item.flight.carrier.caption}
            </div>
          </div>


          {
            item.flight.legs[1].segments[1]?.arrivalCity?.caption !== undefined ?
              (
                <div className="col-12 legs_2">
                  <div className="legs_2_hr"></div>


                  <div className="in_out d-flex col-12 row">
                    <div className="in  d-flex">{item.flight.legs[1].segments[0]?.departureCity?.caption + "," + item.flight.legs[1].segments[0].departureAirport?.caption} <div className="in_out_title">({item.flight.legs[1].segments[0].departureAirport?.uid})</div> </div>
                    <div className="arrow  ">
                      <div className="arrow_item ">&#10230;</div>

                    </div>
                    <div className="out d-flex">{item.flight.legs[1].segments[1].arrivalCity?.caption + "," + item.flight.legs[1].segments[1].arrivalAirport?.caption} <div className="in_out_title">({item.flight.legs[1].segments[1].departureAirport?.uid})</div></div>
                  </div>
                  <div className="in_out_hr"></div>



                  <div className="air_date col-12 row">
                    <div className="arrival_date d-flex col-4">
                      {new_date(1, 0)[0]}
                      <div className="tickets_date">
                        {new_date(1, 0)[1]}
                      </div>
                    </div>
                    <div className="tickets_time text-align-center  col-4">
                      {Math.floor(item.flight.legs[1].duration / 60) + " ч " + (item.flight.legs[1].duration % 60) + " мин"}
                    </div>
                    <div className="arrival_date d-flex col-4">
                      <div className="tickets_date">
                        {new_date(1, 1)[1] + " "}
                      </div>
                      {new_date(1, 1)[0]}

                    </div>
                  </div>
                  <div className="tickets_transfer justify-content-center row col-12 ">
                    <div className="tickets_transfer_hr"></div>
                    <div className="tickets_transfer_title">1 пересадка</div>
                    <div className="tickets_transfer_hr"></div>

                  </div>

                  <div className="tickets_carrier  col-12">
                    Рейс выполняет: {item.flight.carrier.caption}
                  </div>
                </div>
              )
              :
              ""
          }

          <div className="col-12">
            <div className="tickets_button d-flex col-12">
              <div className="tickets_button_title ">Выбрать</div>
            </div>
          </div>





        </div>
      )
    }

  })

  return (
    <div className="container justify-content-center">
      <header className="row">
        <div className="col-4">
          <SideBar isChecked={isChecked} />
        </div>

        <div className="col-8">
          <Search />
          {data_flights.slice(0, state.tickets.pagination)}
          <button className="addElem " onClick={addElem}>Показать еще</button>
        </div>



      </header>
    </div>
  );
}

export default App;
