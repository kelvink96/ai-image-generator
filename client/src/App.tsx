import React from 'react';
import {MantineProvider} from "@mantine/core";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {CreatePost, Home} from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <MantineProvider>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/create-post" element={<CreatePost/>}/>
        </Routes>
      </MantineProvider>
    </BrowserRouter>
  );
};

export default App;
