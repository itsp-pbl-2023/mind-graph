package main

import (
	"context"
	"errors"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/rs/cors"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"

	"github.com/itsp-pbl-2023/mind-graph/grpc/pb/pbconnect"
	"github.com/itsp-pbl-2023/mind-graph/handler"
)

func waitQuit() {
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	signal.Stop(quit)
	close(quit)
	for range quit {
	}
}

func main() {
	service := handler.NewMindGraphService()

	apiMux := http.NewServeMux()
	apiMux.Handle(pbconnect.NewMindGraphServiceHandler(service))

	baseMux := http.NewServeMux()
	baseMux.Handle("/api/", http.StripPrefix("/api", apiMux))

	addr := ":8520"
	server := &http.Server{
		Addr: addr,
		Handler: cors.AllowAll().Handler(
			h2c.NewHandler(baseMux, &http2.Server{}),
		),
	}
	go func() {
		err := server.ListenAndServe()
		if err != nil && !errors.Is(err, http.ErrServerClosed) {
			log.Fatal(err)
		}
	}()

	log.Printf("Listening on %v...\n", addr)

	waitQuit()
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	err := server.Shutdown(ctx)
	if err != nil {
		log.Fatalf("failed to shutdown: %v", err)
	}

	log.Println("Server shutdown")
}
