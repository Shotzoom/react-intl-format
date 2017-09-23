React Intl Format
=================

A [react-intl](https://github.com/yahoo/react-intl) component that provides a alternate way to localize your components.

```js
npm install --save prop-types react-intl react-intl-format
```

If you are using commonjs or es modules, simply require or import the library.

```js
// commonjs
var format = require('react-intl-format);
```
```js
// es modules
import * as format from 'react-intl-format';
```

Umd packages are also included in the bin directory.

## Usage

Below is an example of standard `react-intl` usage. Notice how we wrap the component with the `injectIntl` hoc to gain access to [intlShape](https://github.com/yahoo/react-intl/wiki/API#intlshape). `<FormatMessage />` implicitly  receives this throught context.
```jsx
function LoginForm(props) {
  return (
    <form>
      <h1><FormatMessage id="login-form.heading" /></h1>
      <div className="form-group">
        <input
          className="form-control" 
          placeholder={props.intl.formatMessage({ id: 'login-form.email.placeholder' })}
          name="email"
        />
      </div>
      <div className="form-group">
        <input
          className="form-control" 
          placeholder={props.intl.formatMessage({ id: 'login-form.password.placeholder' })}
          name="password"
        />
      </div>
    </form>
  );
}

export default injectIntl(LoginForm);
```

This example shows basic usage of `react-intl-format`. Notice how we no longer need to wrap the component with `injectIntl` to access the `intlShape` value, its provided as a paramter in the render callback of `Format`.
```jsx
import { Format } from 'react-intl-format';

export default function LoginForm(props) {
  return (
    <form>
      <Format>
        {intl => (
          <h1><FormatMessage id="login-form.heading" /></h1>
          <div className="form-group">
            <input
              className="form-control" 
              placeholder={intl.formatMessage({ id: 'login-form.email.placeholder' })}
              name="email"
            />
          </div>
          <div className="form-group">
            <input
              className="form-control" 
              placeholder={intl.formatMessage({ id: 'login-form.password.placeholder' })}
              name="password"
            />
          </div>
        )}
      </Format>
    </form>
  );
}
```

A `configure` function is avaible to you if you need to customize how format passes down intl down to the render callback. Notice how we wrapped `intl` with a custom api that we can use during rendering. We can also replace `<FormatMessage />` with a simple `{_.m('login-form.heading')}` if we would like.

```jsx
import * as format from 'react-intl-format';

const Localize = format.configure((intl, props) => {
  return {
    m: id => intl.formatMessage({ id })
  };
}, {
  displayName: 'Localize'
});

export default function LoginForm(props) {
  return (
    <form>
      <Localize>
        {_ => (
          <h1><FormatMessage id="login-form.heading" /></h1>
          <div className="form-group">
            <input
              className="form-control" 
              placeholder={_.m('login-form.email.placeholder)}
              name="email"
            />
          </div>
          <div className="form-group">
            <input
              className="form-control" 
              placeholder={_.m('login-form.password.placeholder' )}
              name="password"
            />
          </div>
        )}
      </Localize>
    </form>
  );
}
```

## Api

### configure
Create a custom `Format` component.

```js
const CustomFormat = configure(
  /** 
   * maps intl and and props provided to the component to a single value that
   * will be injected into the render callback.
   * 
   * @param {intlShape} intl
   * @param {object} props
   * @returns {any}
   */
  apiSelector,

  /**
   * optional values that further configure the component.
   */
  options: {
    /**
     * the displayName that custom component will have
     */
    displayName: 'Format'
  }
);
```

### Format

Default implementation.

```js
const Format = configure((intl) => intl);
```
