import React, { useState, useEffect } from 'react';
import './EmailTemplate.css'; // Import CSS for styling
import SentEmailService from '../../services/SentEmailService';

const EmailTemplate = () => {
  const [template, setTemplate] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    // Fetch email template from API when component mounts
    fetchEmailTemplate();
  }, []);

  const fetchEmailTemplate = async () => {
    try {
      // Simulate API call to fetch email template
      const response = await SentEmailService.getEmailTemplate();
      const data = await response;
      setSubject(data.subject);
      setBody(data.body);
      setTemplate("Subject:"+data.subject + '\n\n' + data.body);
    } catch (error) {
      console.error('Error fetching email template:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    // Update email template in the database
    // Add code to send updated template to the API
    const response = await SentEmailService.updateEmailTemplate({"subject" : subject, "body" : body});
    const data = await response;
    setSubject(data.subject);
    setBody(data.body);
    setTemplate("Subject:"+data.subject + '\n\n' + data.body);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset subject and body to original values
    setSubject(template.split('\n\n')[0]);
    setBody(template.split('\n\n')[1]);
    setIsEditing(false);
  };

  return (
    <div className="email-template-container">
      <h2>Email Template</h2>
      {isEditing ? (
        <div>
          <textarea
            className="subject-input"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          ></textarea>
          <textarea
            className="body-input"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
          <button className="save-button" onClick={handleSave}>Save</button>
          <button className="cancel-button" onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <pre className="template-preview">{template}</pre>
          <button className="edit-button" onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default EmailTemplate;
