# API

## Adverts
| API                        | Description              | Request body  | Response body         |
|:--------------------------:|:------------------------:|:-------------:|:---------------------:|
| `GET /api/adverts`         | Get all advert items     |  None         | Array of advert items |
| `GET /api/adverts/{id}`    | Get an item by ID        |  None         | Advert item           |
| `POST /api/adverts`        | Add a new item           |  Advert item  | Advert item           |
| `PUT /api/adverts/{id}`    | Update an existing item  |  Advert item  | None                  |
| `DELETE /api/adverts/{id}` | Delete an item           |  None         | None                  |

## News
| API                        | Description              | Request body  | Response body         |
|:--------------------------:|:------------------------:|:-------------:|:---------------------:|
| `GET /api/news`            | Get all news items       |  None         | Array of news items   |
| `GET /api/news/{id}`       | Get an item by ID        |  None         | News item             |
| `POST /api/news`           | Add a new item           |  News item    | News item             |
| `PUT /api/news/{id}`       | Update an existing item  |  News item    | None                  |
| `DELETE /api/news/{id}`    | Delete an item           |  None         | None                  |
