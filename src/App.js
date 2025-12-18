import React, { Component } from 'react';
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

const Navbar = () => {
  
  //name="arfain";//object


  pageSize=5;
  state={
    progress:0
  }
  setProgress = (progress) => {
    this.setState({progress:progress})
  }

  render() {
    return (
      <div>

       <BrowserRouter>
        <Navbar />
        <LoadingBar
          color="#f11946"
          progress={this.state.progress}
          height={3}
          onLoaderFinished={() => this.setProgress(this.state.progress)}
        />

        <Routes>
          <Route exact path="/" element={<News setProgress={this.setProgress} key='general' pageSize={6} country="in" category="general"/>}></Route>
          <Route exact path="/business" element={<News setProgress={this.setProgress} key='business' pageSize={5} country="in" category="business"/>}></Route>
          <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key='entertainment' pageSize={5} country="in" category="entertainment"/>}></Route>
          <Route exact path="/health" element={<News setProgress={this.setProgress} key='health' pageSize={5} country="in" category="health"/>}></Route>
          <Route exact path="/science" element={<News setProgress={this.setProgress} key='science' pageSize={5} country="in" category="science"/>}></Route>
          <Route exact path="/sports" element={<News setProgress={this.setProgress} key='sports' pageSize={5} country="in" category="sports"/>}></Route>
          <Route exact path="/technology" element={<News setProgress={this.setProgress} key='technology' pageSize={5} country="in" category="technology"/>}></Route>
        </Routes>
       </BrowserRouter>

       {/* <Navbar /> */}
       {/* <News pageSize={5} country="in" category="general"/> */}
      </div>
    );
  }
}

export default App;

