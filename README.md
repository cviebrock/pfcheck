# pfcheck

Quickly check for Pfizer vaccine availability at the Manitoba vaccine super-sites.


### Install

```sh
npm install
```

### Usage

```sh
npm run check
```

If there is availability at any of the locations not listed in `IGNORE_LOCATIONS` (by default Thompson and Dauphin), it will display them.  If there is no availability, it will output nothing.
