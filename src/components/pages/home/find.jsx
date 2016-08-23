import React, { PropTypes } from 'react';
import { forEach, values } from 'lodash';
import texts from '../../../i18n/fr.js';
import cities from '../../../i18n/cities.js';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';

const bgImage = Math.floor(Math.random() * (3 - 1) + 1);

const Find = ({ handleUpdateSearchCity }) => {
  return (
    <div className="bg-container" data-img={bgImage}>
      <div className="absolute-center">
        <h1>{texts.pageHome.title}</h1>
        <p className="subtitle">{texts.pageHome.subtitle}</p>
        <form className="search-bar">
          <div className="input-container">
            <AutoComplete
              hintText={texts.pageHome.searchLabel}
              dataSource={cities}
              onUpdateInput={handleUpdateSearchCity}
              filter={AutoComplete.fuzzyFilter}
            />
          </div>
          <RaisedButton label={texts.pageHome.searchButton} secondary />
        </form>
      </div>
    </div>
  );
};

Find.prototype.propTypes = {
  handleUpdateSearchCity: PropTypes.func
};

export default Find;
