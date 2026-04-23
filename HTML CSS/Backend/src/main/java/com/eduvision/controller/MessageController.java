package com.eduvision.controller;

import com.eduvision.model.Message;
import com.eduvision.service.MessageService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "*")
public class MessageController {

    private final MessageService service;

    public MessageController(MessageService service) {
        this.service = service;
    }

    // ✅ CREATE MESSAGE
    @PostMapping
    public Message createMessage(@RequestBody Message message) {
        return service.saveMessage(message);
    }

    // ✅ GET ALL MESSAGES
    @GetMapping
    public List<Message> getAllMessages() {
        return service.getAllMessages();
    }

    // ✅ DELETE MESSAGE
    @DeleteMapping("/{id}")
    public void deleteMessage(@PathVariable Long id) {
        service.deleteMessage(id);
    }

    // ✅ UPDATE STATUS (IMPORTANT FEATURE)
  @PutMapping("/{id}/status")
public Message updateStatus(@PathVariable Long id, @RequestParam String status) {
    Message message = service.getById(id);
    message.setStatus(status);
    return service.saveMessage(message);
}
}