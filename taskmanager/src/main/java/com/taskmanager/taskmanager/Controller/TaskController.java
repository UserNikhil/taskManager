package com.taskmanager.taskmanager.Controller;

import com.taskmanager.taskmanager.Repository.TaskRepository;
import com.taskmanager.taskmanager.model.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("task")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @GetMapping
    public List<Task> getAllTask()
    {
        return  taskRepository.findAll();
    }

    @PostMapping
    public Task createTask(@RequestBody Task task)
    {
        return taskRepository.save(task);
    }

    @PutMapping("/{id}")
    public  Task updateTask(@PathVariable Long id, @RequestBody Task updatetask)
    {
        Task task1=taskRepository.findById(id).orElseThrow();
        task1.setTitle(updatetask.getTitle());
        task1.setCompleted(updatetask.isCompleted());
        return taskRepository.save(task1);
    }

    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable Long id)
    {
        taskRepository.deleteById(id);
        return "Successfully deleted";
    }
}
