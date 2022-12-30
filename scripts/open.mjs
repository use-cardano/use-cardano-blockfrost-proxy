import localtunnel from "localtunnel"
import open from "open"

// Give the build some time to finish
setTimeout(() => {
  localtunnel({ port: 4203 }).then((tunnel) => {
    console.log()
    console.log("> serving examples on", "http://localhost:4203")
    console.log("> serving examples on", tunnel.url)
    console.log()

    open(tunnel.url)

    // make sure localhost is opened last
    setTimeout(() => open("http://localhost:4203"), 500)
  })
}, 3000)
