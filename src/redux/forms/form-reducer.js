
import { reducer as formReducer } from 'redux-form';
import {isEqual} from 'lodash';
import articleFormReducer from './article-form-plugin';

export default formReducer.plugin({
    articleForm: articleFormReducer
});
