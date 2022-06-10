
import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import thunk from "redux-thunk";
import isReact from "is-react";

import * as data from "../../actions";
import PokCreate from "./index.js";
// import * as actions from  "../../actions";

configure({ adapter: new Adapter() });

describe("<PokCreate />", () => {
  const state = { houses: data.houses };
  const mockStore = configureStore([thunk]);
  // const { getTipo } = actions;

  beforeAll(() => expect(isReact.classComponent(PokCreate)).toBeFalsy());


  describe("Estructura", () => {
    let PokCreate;
    let store = mockStore(state);
    beforeEach(() => {
      PokCreate = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/PokCreate"]}>
            <PokCreate />
          </MemoryRouter>
        </Provider>
      );
    });

    it("Debería renderizar un form", () => {
      expect(PokCreate.find("form")).toHaveLength(1);
    });

    it('Debería renderizar un label con el texto "name"', () => {
      expect(PokCreate.find("label").at(0).text()).toEqual( "name");
    });

    it('Debería renderizar un label con el texto "height"', () => {
      expect(PokCreate.find("label").at(1).text()).toEqual("height");
    });

    it('Debería renderizar un label con el texto "weight"', () => {
      expect(PokCreate.find("label").at(2).text()).toEqual("weight");
    });

    it('Debería renderizar un label con el texto "life"', () => {
      expect(PokCreate.find("label").at(2).text()).toEqual("life");
    });

    it('Debería renderizar un label con el texto "attack"', () => {
      expect(PokCreate.find("label").at(2).text()).toEqual("attack");
    });

    it('Debería renderizar un label con el texto "defense"', () => {
      expect(PokCreate.find("label").at(2).text()).toEqual("defense");
    });

    it('Debería renderizar un label con el texto "speed"', () => {
      expect(PokCreate.find("label").at(2).text()).toEqual("speed");
    });

    it('Debería renderizar un label con el texto "image"', () => {
      expect(PokCreate.find("label").at(2).text()).toEqual("image");
    });
  
    it('Debería renderizar un button con "type" igual a "submit" y con texto "Crear Pokemon"', () => {
      expect(PokCreate.find('button[type="submit"]')).toHaveLength(1);
      expect(PokCreate.find("button").at(0).text()).toEqual("Crear Pokemon");
    });
  });
});


