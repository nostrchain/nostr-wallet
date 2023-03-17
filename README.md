

nostr-web3js sample code

As it runs in the browser, the surface is not nodejs and the following code needs to be added to app.js:

```
import { Buffer } from "buffer";
window.Buffer = window.Buffer || Buffer;
```

demo
http://64.176.44.80:3000/


