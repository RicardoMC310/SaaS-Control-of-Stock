FROM golang:1.25.1

# Copia todo o projeto
WORKDIR /app
COPY . .

# Compila o binário do servidor
WORKDIR /app/cmd/server
RUN go build -o main .

USER nobody

CMD ["./main"]
EXPOSE 3303
ENV PORT=3303
