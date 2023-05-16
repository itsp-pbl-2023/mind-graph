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

	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"

	"github.com/itsp-pbl-2023/mind-graph/grpc/pb/pbconnect"
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
	handler := &MindGraphService{}

	apiMux := http.NewServeMux()
	apiMux.Handle(pbconnect.NewMindGraphServiceHandler(handler))

	mux := http.NewServeMux()
	mux.Handle("/api/", http.StripPrefix("/api", apiMux))

	addr := ":8520"
	server := &http.Server{
		Addr:    addr,
		Handler: h2c.NewHandler(mux, &http2.Server{}),
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
