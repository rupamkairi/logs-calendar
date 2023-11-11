```sh
$ docker build --file Dockerfile.surrealdb --tag rupamkairi/surrealdb .
```

```sh
$ surreal start --auth --user root --pass password
```

```sh
$ surreal sql --user root --pass password

$ USE NS logs_calendar DB logs_calendar;
logs_calendar/logs_calendar>
```
