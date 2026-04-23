package com.eduvision.service;

import com.eduvision.model.Message;
import com.eduvision.repository.MessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

    private final MessageRepository repository;

    public MessageService(MessageRepository repository) {
        this.repository = repository;
    }

    // ✅ SAVE MESSAGE (WITH VALIDATION)
    public Message saveMessage(Message message) {

        if (message.getName() == null || message.getName().isEmpty()) {
            throw new RuntimeException("Name is required");
        }

        if (message.getEmail() == null || !message.getEmail().contains("@")) {
            throw new RuntimeException("Invalid email");
        }

        if (message.getMessage() == null || message.getMessage().isEmpty()) {
            throw new RuntimeException("Message cannot be empty");
        }

        return repository.save(message);
    }

    // ✅ GET ALL MESSAGES
    public List<Message> getAllMessages() {
        return repository.findAll();
    }

    // ✅ DELETE MESSAGE
    public void deleteMessage(Long id) {
        repository.deleteById(id);
    }

    // ✅ GET MESSAGE BY ID
    public Message getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Message not found"));
    }
}