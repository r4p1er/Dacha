FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build-env
WORKDIR /app

COPY *.csproj ./
RUN dotnet restore

COPY . ./
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR /app
COPY --from=build-env /app/out .

RUN apt-get -y update && apt-get install -y dos2unix
COPY entrypoint.sh ./entrypoint.sh
RUN dos2unix ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

RUN apt-get install -y tzdata
ENV TZ Europe/Moscow

ENTRYPOINT ["./entrypoint.sh"]