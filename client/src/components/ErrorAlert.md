# ErrorAlert Component Documentation

A reusable alert component for displaying error, success, warning, and info messages throughout the application.

## Usage

```jsx
import ErrorAlert from '../components/ErrorAlert';

// Basic error alert
<ErrorAlert 
  error="Something went wrong!"
  onDismiss={() => setError(null)}
/>

// Success message
<ErrorAlert 
  error="Record saved successfully!"
  type="success"
  onDismiss={() => setSuccess(null)}
/>

// Warning with title
<ErrorAlert 
  error="Please check your input"
  type="warning"
  title="Validation Warning"
  onDismiss={() => setWarning(null)}
/>

// Info message that auto-dismisses
<ErrorAlert 
  error="Loading data..."
  type="info"
  dismissible={false}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `error` | `string \| object` | - | The error message or error object (required) |
| `onDismiss` | `function` | - | Callback when alert is dismissed |
| `type` | `'error' \| 'success' \| 'warning' \| 'info'` | `'error'` | Alert type determines styling |
| `title` | `string` | - | Optional title for the alert |
| `dismissible` | `boolean` | `true` | Whether to show dismiss button |
| `className` | `string` | `''` | Additional CSS classes |

## Alert Types

### Error (default)
- **Color**: Red
- **Icon**: X in circle
- **Use**: API errors, validation errors, critical issues

### Success
- **Color**: Green  
- **Icon**: Checkmark
- **Use**: Successful operations, confirmations

### Warning
- **Color**: Yellow
- **Icon**: Exclamation triangle
- **Use**: Cautions, non-critical issues

### Info
- **Color**: Blue
- **Icon**: Information circle
- **Use**: General information, tips

## Examples

### In a Form Component

```jsx
import { useState } from 'react';
import ErrorAlert from '../components/ErrorAlert';

function MyForm() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      setError(null);
      const response = await api.post('/endpoint', formData);
      
      if (response.status) {
        setSuccess('Form submitted successfully!');
        setTimeout(() => setSuccess(null), 5000); // Auto-hide after 5s
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Failed to submit form');
    }
  };

  return (
    <div>
      <ErrorAlert 
        error={success}
        type="success"
        onDismiss={() => setSuccess(null)}
        className="mb-4"
      />
      
      <ErrorAlert 
        error={error}
        type="error"
        onDismiss={() => setError(null)}
        className="mb-4"
      />
      
      {/* Your form content */}
    </div>
  );
}
```

### Global Error Handler

```jsx
// In your main app component
function App() {
  const [globalError, setGlobalError] = useState(null);

  // Set up global error handler
  useEffect(() => {
    const handleGlobalError = (error) => {
      setGlobalError(error.message);
    };
    
    window.addEventListener('unhandledrejection', handleGlobalError);
    return () => window.removeEventListener('unhandledrejection', handleGlobalError);
  }, []);

  return (
    <div>
      <ErrorAlert 
        error={globalError}
        type="error"
        title="Application Error"
        onDismiss={() => setGlobalError(null)}
        className="fixed top-4 right-4 z-50 max-w-md"
      />
      
      {/* Your app content */}
    </div>
  );
}
```

## Styling Notes

- Uses Tailwind CSS classes
- Responsive design
- Consistent with design system colors
- Proper focus states for accessibility
- Screen reader friendly with `aria-label`

## Best Practices

1. **Clear Messages**: Use descriptive, user-friendly error messages
2. **Auto-dismiss**: Consider auto-dismissing success messages after 3-5 seconds
3. **Positioning**: Use consistent positioning (typically at top of sections)
4. **Single Instance**: Only show one alert of each type at a time
5. **Context**: Provide contextual information when possible

## Integration

Already integrated into:
- ✅ `ErrorTrackerPage.jsx` - For API errors and success messages
- 🔄 Can be added to other pages as needed

## Customization

The component is fully customizable through:
- CSS classes via `className` prop
- Icon paths can be modified in the `getAlertStyles()` function
- Colors can be adjusted by modifying Tailwind classes
