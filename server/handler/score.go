package handler

func (m *mindGraphService) addScore(userID string, increment int) {
	m.lock.Lock()
	defer m.lock.Unlock()

	m.scores[userID] += increment
}
