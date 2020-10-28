FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-env
WORKDIR /app

COPY *.csproj ./
RUN dotnet restore

COPY . ./
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
WORKDIR /app
COPY --from=build-env /app/out .

RUN apt-get -y update && apt-get install -y dos2unix
COPY entrypoint.sh ./entrypoint.sh
RUN dos2unix ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

RUN timedatectl set-timezone Europe/Moscow

ENTRYPOINT ["./entrypoint.sh"]