import React from "react";

const Search = (props) => {

    
    return (
        <div onSubmit={props.searchMethod} className=" header container col-sm-8">
           {/* <div className="row justify-content-center ">
           <h1 className="col-12  search_title">Tickets finder</h1>
           </div>
           <div className="row">
               <input className="col-5" name="search" placeholder="Откуда"/>
               <input className="col-5" name="search" placeholder="Куда"/>

               <button className="col-2" >Искать</button>
           </div>
           <div className="row ">
               <div className="cat col-6  ">
                    <strong>Categories</strong>
                    <select className="col-4">
                   <option value="all">all</option>
               </select>
               </div>

               <div className="sort col-6">
                    <strong>Sorting by</strong>
                    <select className="col-4">
                   <option value="relevance">relevance</option>
               </select>
               </div>

           </div> */}
        </div>
    );
};

export default Search;