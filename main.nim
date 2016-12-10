import asyncdispatch, asynchttpserver, strutils, uri

var server = newAsyncHttpServer()

proc cb(req: Request) {.async.} =
  var parts = req.url.path.split('/')
  if parts[1] == "f" and parts.len >= 3:
    var file: File
    if open(file, parts[2]):
      await req.respond(Http200, readAll(file))
    else:
      await req.respond(Http404, "")
  else:
    await req.respond(Http200, "Hello World")

waitFor server.serve(Port(8080), cb)
